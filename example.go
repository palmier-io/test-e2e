package main

import (
	"fmt"
	"sync"
	"time"
)

// Interface definition
type Worker interface {
	Work()
	GetName() string
}

// Struct implementation
type Employee struct {
	name     string
	position string
	salary   float64
}

func (e *Employee) Work() {
	fmt.Printf("%s is working as %s\n", e.name, e.position)
}

func (e *Employee) GetName() string {
	return e.name
}

// Channel example
func worker(id int, jobs <-chan int, results chan<- int) {
	for j := range jobs {
		fmt.Printf("worker %d processing job %d\n", id, j)
		time.Sleep(time.Millisecond * 100)
		results <- j * 2
	}
}

func main() {
	// Create workers
	var workers []Worker
	workers = append(workers, &Employee{"John", "Developer", 75000})
	workers = append(workers, &Employee{"Jane", "Manager", 85000})

	// Use workers
	for _, w := range workers {
		w.Work()
	}

	// Goroutines and channels
	jobs := make(chan int, 5)
	results := make(chan int, 5)

	// Start workers
	var wg sync.WaitGroup
	for w := 1; w <= 3; w++ {
		wg.Add(1)
		go func(id int) {
			defer wg.Done()
			worker(id, jobs, results)
		}(w)
	}

	// Send jobs
	for j := 1; j <= 5; j++ {
		jobs <- j
	}
	close(jobs)

	wg.Wait()
	close(results)
} 