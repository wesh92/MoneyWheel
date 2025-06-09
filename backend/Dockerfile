# backend/Dockerfile

# Stage 1: Build the Go binary
FROM golang:1.24.4-alpine AS builder

WORKDIR /app

# Copy go mod and sum files
COPY go.mod ./
COPY go.sum ./

# Download all dependencies.
RUN go mod download

# Copy the source code
COPY . .

# Build the Go app
# -ldflags="-w -s" strips debugging information, reducing the binary size.
# CGO_ENABLED=0 allows for a static binary.
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-w -s" -o /main .

# Stage 2: Create a minimal final image
FROM scratch

# Copy the static binary from the builder stage
COPY --from=builder /main /main

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to run the executable
ENTRYPOINT ["/main"]
