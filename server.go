package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
)

func readCSV() {
	fmt.Println("Reading csv file...")

	// Create a matrix the size of our csv data set
	var csvArray [8527][2]int

	// Create an array for each csv entry
	var csvEntry [2]int

	// Open csv file
	csvFile, err := os.Open("data/traffic.csv")
	defer csvFile.Close()
	if err != nil {
		panic(err)
	}

	// Create csv reader
	csvReader := csv.NewReader(csvFile)

	// Count for iteration through csv
	count := 0

	// For all csv entries
	for {
		// Read csv entry
		fields, err := csvReader.Read()
		if err == io.EOF {
			break
		} else if err != nil {
			panic(err)
		}

		// Convert string to integer for each entry and add it to entry array
		for i := 0; i < len(fields); i++ {
			s := fields[0]

			// string to int
			inty, err := strconv.Atoi(s)
			if err != nil {
				// handle error
				fmt.Println(err)
				os.Exit(2)
			}
			csvEntry[i] = inty
		}

		// Add to json array
		csvArray[count] = csvEntry
		count++
	}

	// Create json file
	fmt.Println("Creating json file...")

	f, err := os.Create("data/traffic.json")
	if err != nil {
		log.Println("Error :", err)
		return
	}
	defer f.Close()

	// Marshal our csvArray to json
	bout, _ := json.Marshal(csvArray)

	// Write it to our new json file
	f.Write(bout)
}

func main() {
	readCSV()

	log.Println("Starting Server")
	http.Handle("/", http.FileServer(http.Dir("./app/")))

	log.Println("Listening on 8080")
	http.ListenAndServe(":8080", nil)
}
