/* Module to create a Cloud Function triggered by Pub/Sub */
resource "google_service_account" "account" {
  account_id = var.account_id
  display_name = "The Service account"
}

resource "google_storage_bucket_object" "function_zip" {
  name   = "function.zip"
  bucket = google_storage_bucket.function_bucket.name
  source = "./cloud_function/function.zip"
}

resource "google_cloudfunctions2_function" "complaint_function" {
  name        = "complaintFunction"
  description = "Function to handle and forward complaints"
  project     = var.project_id
  location    = var.region

  build_config {
    entry_point = var.function_entry_point
    runtime     = var.function_runtime

    source {
      storage_source {
        bucket = google_storage_bucket.function_bucket.name
        object = google_storage_bucket_object.function_zip.name
      }
    }
  }

  service_config {
    max_instance_count  = 3
    min_instance_count = 1
    available_memory    = "4Gi"
    timeout_seconds     = 60
    max_instance_request_concurrency = 80
    available_cpu = "4"
    environment_variables = {
      PROPERTY_AGENTS = "bpdatal5@gmail.com, bhishman@dal.ca, shivang2727@gmail.com, Abhishekrocks922@gmail.com, testmaillab2023@gmail.com"
    }
    ingress_settings = "ALLOW_INTERNAL_ONLY"
    all_traffic_on_latest_revision = true
    service_account_email = google_service_account.account.email
  }

  event_trigger {
    trigger_region = var.region
    event_type = "google.cloud.pubsub.topic.v1.messagePublished"
    pubsub_topic   = google_pubsub_topic.complaint_topic.id
    retry_policy = "RETRY_POLICY_RETRY"
  }
}

