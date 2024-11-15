#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Structure definition
typedef struct {
    char name[50];
    int id;
    float score;
} Student;

// Function prototypes
void printStudent(Student* student);
Student* createStudent(const char* name, int id, float score);

// Global variable example
const int MAX_STUDENTS = 100;

int main() {
    // Array allocation
    Student* students[2];
    
    // Create students
    students[0] = createStudent("John Doe", 1, 85.5);
    students[1] = createStudent("Jane Smith", 2, 92.0);

    // Print students
    for (int i = 0; i < 2; i++) {
        printStudent(students[i]);
    }

    // Memory cleanup
    for (int i = 0; i < 2; i++) {
        free(students[i]);
    }

    return 0;
}

Student* createStudent(const char* name, int id, float score) {
    Student* student = (Student*)malloc(sizeof(Student));
    strncpy(student->name, name, 49);
    student->name[49] = '\0';
    student->id = id;
    student->score = score;
    return student;
}

void printStudent(Student* student) {
    printf("Student ID: %d\n", student->id);
    printf("Name: %s\n", student->name);
    printf("Score: %.2f\n\n", student->score);
} 