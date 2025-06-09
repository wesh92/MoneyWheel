// backend/main.go
package main

import (
    "encoding/json"
    "log"
    "net/http"
)

func main() {
    // Define the handler for our healthcheck endpoint
    http.HandleFunc("/api/v1/healthcheck", func(w http.ResponseWriter, r *http.Request) {
        // Set the Content-Type header to application/json
        w.Header().Set("Content-Type", "application/json")

        // Create a map to hold our response data
        response := map[string]string{"status": "ok", "service": "backend"}

        // Encode the map to JSON and write it to the response
        json.NewEncoder(w).Encode(response)
    })

    // Start the server on port 8080
    log.Println("Backend server starting on :8080")
    if err := http.ListenAndServe(":8080", nil); err != nil {
        log.Fatalf("Could not start server: %s\n", err)
    }
}
