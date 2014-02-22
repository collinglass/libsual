package main

import (
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
)

type hourlyVisit struct {
	Hour           int `field: Hour`
	UniqueVisitors int
}

func readCSV() {
	csvFile, err := os.Open("data/traffic.csv")
	defer csvFile.Close()
	if err != nil {
		panic(err)
	}
	csvReader := csv.NewReader(csvFile)
	for {
		fields, err := csvReader.Read()
		if err == io.EOF {
			break
		} else if err != nil {
			panic(err)
		}
		fmt.Print(fields)
	}
}

func main() {
	readCSV()

	log.Println("Starting Server")
	http.Handle("/", http.FileServer(http.Dir("./app/")))

	log.Println("Listening on 8080")
	http.ListenAndServe(":8080", nil)
}
