variable "project_id" {
  description = "The GCP project ID"
  type        = string
  default     = "serverless-426417"
}

variable "account_id" {
  description = "The Service account ID"
  type        = string
  default     = "service-account-pubsub"
}

variable "region" {
  description = "The region to deploy resources"
  type        = string
  default     = "us-central1"
}

variable "location_id" {
  description = "The location id"
  type        = string
  default     = "nam5"
}

variable "bucket_name" {
  description = "The name of the GCS bucket to store function code"
  type        = string
  default     = "function_bucket_pub_sub"
}

variable "function_runtime" {
  description = "The runtime for the Cloud Function"
  type        = string
  default     = "nodejs20"
}

variable "function_entry_point" {
  description = "The entry point for the Cloud Function"
  type        = string
  default     = "forwardComplaint"
}