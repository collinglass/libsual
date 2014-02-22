package main

import (
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"io"
	"log"
	"net/http"
	"os"
)

func JSONHandler(w http.ResponseWriter, r *http.Request) {
	filepath := "data/osstats2013.json"

	fi, err := os.Open(filepath)
	if err != nil {
		panic(err)
	}
	// close fi on exit and check for its returned error
	defer func() {
		if err := fi.Close(); err != nil {
			panic(err)
		}
	}()

	// make a buffer to keep chunks that are read
	buf := make([]byte, 1024)
	for {
		// read a chunk
		n, err := fi.Read(buf)
		if err != nil && err != io.EOF {
			panic(err)
		}
		if n == 0 {
			break
		}

		// write a chunk
		if _, err := w.Write([]byte(buf[:n])); err != nil {
			panic(err)
		}
	}
}

func main() {

	r := mux.NewRouter()
	r.HandleFunc("/api/data/", JSONHandler).Methods("GET")

	log.Println("Starting Server")

	http.Handle("/api/", r)
	http.Handle("/", logHandler(http.FileServer(http.Dir("./app/"))))

	log.Println("Listening on 8080")
	panic(http.ListenAndServe(":8080", nil))

}

func logHandler(h http.Handler) http.Handler {
	return handlers.LoggingHandler(os.Stdout, h)
}
