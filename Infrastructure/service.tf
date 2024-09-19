/* Define Service Account */
resource "google_service_account" "default" {
  account_id = var.account_id

  project = var.project_id

  display_name = "Service Account for project ${var.project_id}"

  description = "This service account is used by the project ${var.project_id}"
}

/* For giving logging and pushing to artifact registry permissions */
resource "google_project_iam_binding" "logs_writer_binding" {
  project = var.project_id

  role = "roles/editor"

  members = [
    "serviceAccount:${google_service_account.default.email}"
  ]
}

/* Define the Cloud Build trigger for continuous deployment from GitHub */
resource "google_cloudbuild_trigger" "github_trigger" {
  name = "github-trigger"

  location = var.region

  /* Service Account */
  service_account = google_service_account.default.name

  /* GitHub Config */
  github {
    owner = "bhishman-desai"
    name  = "dalvacation-serverless-app"
    push {
      branch = "^main$"
    }
  }

  /* Build steps */
  build {
    step {
      /* Use Docker to build the image */
      name = "gcr.io/cloud-builders/docker"
      args = ["build", "-t", "gcr.io/${var.project_id}/dal-vacation-service:latest", "."]
      dir  = "Frontend/dal-vacation-app" /* Specify the directory of the Dockerfile */
    }

    /* Specify the image to be pushed to Google Container Registry */
    images = ["gcr.io/${var.project_id}/dal-vacation-service:latest"]

    options {
      logging = "CLOUD_LOGGING_ONLY"
    }
  }
}

/* Define a null resource to run the Cloud Build trigger */
resource "null_resource" "trigger_run" {
  triggers = {
    build_id = google_cloudbuild_trigger.github_trigger.id
  }

  provisioner "local-exec" {
    command = <<EOT
      gcloud alpha builds triggers run ${google_cloudbuild_trigger.github_trigger.name} --region=${var.region} --branch=main
    EOT
  }
}

/* Ensure Cloud Run is created after the build trigger completes */
resource "google_cloud_run_v2_service" "dal_vacation_service" {
  name = "dal-vacation-service"

  /* Depends on cloud build to fetch and build image from github repo */
  depends_on = [google_cloudbuild_trigger.github_trigger, null_resource.trigger_run]

  location = var.region

  project = var.project_id

  /* Allowing direct access to the service from the internet */
  ingress = "INGRESS_TRAFFIC_ALL"

  template {
    scaling {
      /* Scaling config with min 0 and max 100 CPUs */
      min_instance_count = 0
      max_instance_count = 100
    }

    containers {
      /* Set the container image from Google Container Registry */
      image = "gcr.io/${var.project_id}/dal-vacation-service:latest"

      /* Default port - 3000 for react app */
      ports {
        container_port = 8080
      }

      /* Environment Variables */
      env {
        name  = "FOO"
        value = "bar"
      }

      resources {
        /* Set the CPU limit to 1 vCPU */
        limits = {
          cpu    = "1"
          memory = "512Mi"
        }
      }
    }
  }

  traffic {
    type    = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent = 100
  }
}

/* To allow unauthenticated invocations for public API or website */
data "google_iam_policy" "no-auth" {
  binding {
    role = "roles/run.invoker"
    members = [
      "allUsers",
    ]
  }
}

resource "google_cloud_run_service_iam_policy" "no-auth" {
  location = var.region
  project  = var.project_id
  service  = google_cloud_run_v2_service.dal_vacation_service.name

  policy_data = data.google_iam_policy.no-auth.policy_data
}




