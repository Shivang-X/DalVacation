/* Module to create Firestore index for logging complaints */
resource "google_firestore_database" "database" {
  project     = var.project_id
  name        = "(default)"
  location_id = var.location_id
  type        = "FIRESTORE_NATIVE"

  delete_protection_state = "DELETE_PROTECTION_DISABLED"
  deletion_policy         = "DELETE"
}

resource "google_firestore_index" "default_index" {
  project    = var.project_id
  database   = google_firestore_database.database.name
  collection = "complaint_logs"

  fields {
    field_path = "customerId"
    order      = "ASCENDING"
  }
  fields {
    field_path = "agentId"
    order      = "ASCENDING"
  }
}
