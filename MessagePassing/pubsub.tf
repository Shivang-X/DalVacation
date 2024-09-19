/* Module to create a Pub/Sub topic and subscription */
resource "google_pubsub_topic" "complaint_topic" {
  name = "complaint-topic"
}

output "topic_name" {
  value = google_pubsub_topic.complaint_topic.name
}
