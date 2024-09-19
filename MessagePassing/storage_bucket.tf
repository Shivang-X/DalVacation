/* Module to create a GCS bucket for storing Cloud Function code */
resource "google_storage_bucket" "function_bucket" {
  name          = var.bucket_name
  location      = var.region
  force_destroy = true
}

output "bucket_name" {
  value = google_storage_bucket.function_bucket.name
}
