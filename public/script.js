function gradeCalc(grade, unit) {
    if (grade === "A") {
        return 4 * unit; // A is 4 points
    } else if (grade === "B") {
        return 3 * unit; // B is 3 points
    } else if (grade === "C") {
        return 2 * unit; // C is 2 points
    } else if (grade === "D") {
        return 1 * unit; // D is 1 point
    } else if (grade === "F") {
        return 0 * unit; // F is 0 points
    }
}

let courseCount = 1; // Tracks the number of courses

// Function to add a new course row
function addCourse() {
  const courseWrapper = document.getElementById('course-wrapper');
  const div = document.createElement('div');
  div.className = `course-row key-${courseCount}`;
  div.innerHTML = `
    <input type="text" class="courses key-${courseCount}" placeholder="Course Code" required />
    <input type="number" class="credit-units key-${courseCount}" placeholder="Credit Units" required />
    <select class="grade key-${courseCount}" required>
      <option value="select">Select</option>
      <option value="5">A (75-100)</option>
      <option value="4">B (70-74)</option>
      <option value="3">C (65-69)</option>
      <option value="2">D (60-64)</option>
      <option value="1">E (50-59)</option>
      <option value="0">F (0-49)</option>
    </select>
  `;
  courseWrapper.appendChild(div);
  courseCount++;
}

// Function to remove the last course row
function removeCourse() {
  if (courseCount > 1) {
    const courseWrapper = document.getElementById('course-wrapper');
    const lastRow = courseWrapper.querySelector(`.key-${courseCount - 1}`);
    if (lastRow) {
      courseWrapper.removeChild(lastRow);
      courseCount--;
    }
  } else {
    alert('You must have at least one course.');
  }
}

// Function to calculate CGPA
function calcCgpa() {
    const creditUnits = document.querySelectorAll('.credit-units');
    const grades = document.querySelectorAll('.grade');

    let totalCreditUnits = 0;
    let totalGradePoints = 0;

    for (let i = 0; i < creditUnits.length; i++) {
        const creditUnit = parseInt(creditUnits[i].value);
        const grade = parseInt(grades[i].value);

        // Ensure valid input
        if (!isNaN(creditUnit) && !isNaN(grade) && grades[i].value !== "select") {
            totalCreditUnits += creditUnit;
            totalGradePoints += creditUnit * grade;
        }
    }

    if (totalCreditUnits === 0) {
        alert('Please enter valid credit units and select valid grades.');
        return;
    }

    const cgpa = (totalGradePoints / totalCreditUnits).toFixed(2);
    document.getElementById('cgpa-calc').textContent = `Your CGPA is: ${cgpa}`;
}
