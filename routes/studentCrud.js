const mongoose = require('mongoose');
const express = require('express');
const Student = require('../models/student')
const bcrypt = require('bcryptjs')
const router = express.Router()

const fs = require('fs');
const PDFDocument = require('pdfkit');
const PDFTable = require('pdfkit-table');
const Marks = require('../models/marksSchema')


router.post('/create', async (req, res) => {

  let epassword;
  if (req.body.password) {
    epassword = bcrypt.hash(req.body.password, 10, async (err, hash) => {
      if (err) {
        console.log("Error")
        return res.status(400).json({
          message: "An error occured"
        })
      }
    })
  }
  else {
    let user;
    try {
      user = await Student.find({ halltktno: req.body.halltktno })
    }
    catch (err) {
      res.status(404).json({
        message: 'User not found'
      })
    }
    if (user) {
      const dbpwd = user.password;
      epassword = bcrypt.hash(dbpwd, 10, async (err, hash) => {
        if (err) {
          console.log("Error")
          return res.status(400).json({
            message: "An error occured"
          })
        }
      })
    }
  }

  const std = {
    name: req.body.name,
    branch: req.body.branch,
    section: req.body.section,
    halltktno: req.body.halltktno,
    category: req.body.category,
    contactno: req.body.contactno,
    password: epassword,
    email: req.body.email,
    fname: req.body.fname,
    mname: req.body.mname,
    pcontact: req.body.pcontact,
    address: req.body.address,
    tenyr: req.body.tenyr,
    tenmarks: req.body.tenmarks,
    tweyr: req.body.tweyr,
    twemarks: req.body.twemarks,
    twesch: req.body.twesch,
    tensch: req.body.tensch,
  }
  let obj;
  try {
    obj = await Student.create(std);
  }
  catch (err) {
    console.log(err);
  }
  if (obj) {
    res.status(201).json({
      data: obj
    })
  }
})

// API to get student information
// router.get('/marks/:rollNo', async (req, res) => {
//   try {
//     const { rollNo } = req.params;
//     const student = await Marks.findOne({ rollNo });
//     res.json(student);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// router.get('/marks/:rollNo', async (req, res) => {
//   const { rollNo } = req.params;

//   try {
//     // Find the document for the given rollNo
//     const studentMarks = await Marks.findOne({ rollNo });

//     if (!studentMarks) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'Student not found',
//       });
//     }

//     res.status(200).json({
//       status: 'success',
//       data: studentMarks,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: 'error',
//       message: 'Internal Server Error',
//     });
//   }
// });

router.get('/marks/:rollNo', async (req, res) => {
  const { rollNo } = req.params;

  try {
    // Find the document for the given rollNo
    const studentMarks = await Marks.findOne({ rollNo });

    if (!studentMarks) {
      return res.status(404).json({
        status: 'fail',
        message: 'Student not found',
      });
    }

// Generate a PDF
const pdfDoc = new PDFDocument();
pdfDoc.pipe(res);

pdfDoc.text(`Student Roll No: ${studentMarks.rollNo}`);

// Iterate through semesters, subjects, and marks
studentMarks.semesters.forEach((semester) => {
  pdfDoc.text(`\nSemester No: ${semester.semesterNo}`);

  semester.subjects.forEach((subject) => {
    pdfDoc.text(`\nSubject: ${subject.subjectName}`);
    pdfDoc.text(`Mid Marks: ${subject.marks.midMarks}`);
    pdfDoc.text(`Assignment Marks: ${subject.marks.assignmentMarks}`);
    pdfDoc.text(`Slip Test Marks: ${subject.marks.slipTestMarks}\n`);
  });
});

pdfDoc.end();
}catch (error) {
      // Handle errors here
      console.error(error);
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    };
  })

// router.get('/marks/:rollNo', async (req, res) => {
//   const { rollNo } = req.params;

//   try {
//     // Find the document for the given rollNo
//     const studentMarks = await Marks.findOne({ rollNo });

//     if (!studentMarks) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'Student not found',
//       });
//     }

//     // Create a PDF document
//     const pdfDoc = new PDFDocument();

//     // Set the content type for the response
//     res.setHeader('Content-Type', 'application/pdf');

//     // Set the Content-Disposition header to force the browser to download the file
//     res.setHeader('Content-Disposition', `attachment; filename=student_marks_${rollNo}.pdf`);

//     // Pipe the PDF directly to the response stream
//     pdfDoc.pipe(res);

//     // Add a logo to the PDF
//     pdfDoc.image('loginlogo.png', { width: 200 });

//     // Add student information
//     pdfDoc.text(`Student Roll No: ${studentMarks.rollNo}`);

//     // Iterate through semesters, subjects, and marks
//     studentMarks.semesters.forEach((semester) => {
//       pdfDoc.text(`\nSemester No: ${semester.semesterNo}`);

//       // Create a table for subjects and marks
//       const table = {
//         headers: ['Subject', 'Mid Marks', 'Assignment Marks', 'Slip Test Marks'],
//         rows: semester.subjects.map((subject) => [
//           subject.subjectName,
//           subject.marks.midMarks,
//           subject.marks.assignmentMarks,
//           subject.marks.slipTestMarks,
//         ]),
//       };

//       // Create a table instance
//       const pdfTable = new PDFTable(pdfDoc);
//       pdfTable.addTable(table.headers, table.rows);
//       pdfDoc.moveDown(); // Move the cursor down after the table
//     });

//     // Finalize the PDF and send it to the client
//     pdfDoc.end();

//   } catch (error) {
//     // Handle errors here
//     console.error(error);
//     res.status(500).json({
//       status: 'error',
//       message: 'Internal Server Error',
//     });
//   }
// });

// Adding marks

router.post('/marks/add-cie', async (req, res) => {
  const { rollNo, semesterNo, subjectName, midMarks, assignmentMarks, slipTestMarks } = req.body;

  const marks = {
    subjectName,
    marks: {
      midMarks,
      assignmentMarks,
      slipTestMarks,
    },
  };

  try {
    // Find the existing document for the given rollNo
    let existingMark = await Marks.findOne({ rollNo });

    if (!existingMark) {
      // If the document doesn't exist, create a new one
      existingMark = new Marks({
        rollNo,
        semesters: [
          {
            semesterNo,
            subjects: [marks], // Initialize the subjects array with the new subject and marks
          },
        ],
      });

      // Save the new document to the database
      const updatedMark = await existingMark.save();

      // console.log(updatedMark);

      return res.status(201).json({
        status: 'success',
        data: updatedMark,
      });
    }

    // Find the semester or create a new one if it doesn't exist
    let existingSemester = existingMark.semesters.find(
      (s) => s.semesterNo === semesterNo
    );

    if (!existingSemester) {
      // Initialize the subjects array with the new subject and marks
      existingSemester = { semesterNo, subjects: [marks] };
      existingMark.semesters.push(existingSemester);
    } else {
      // Add the new subject to the existing or newly created semester
      existingSemester.subjects.push(marks);
    }

    // Save the updated document to the database
    const updatedMark = await existingMark.save();

    console.log(updatedMark);

    res.status(201).json({
      status: 'success',
      data: updatedMark,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }
});


// API to update marks for a subject
// router.post('/marks/update-marks', async (req, res) => {
//   try {
//     const { rollNo, semesterNo, subjectName, marks } = req.body;
//     const updatedStudent = await Marks.findOneAndUpdate(
//       { rollNo, 'semesters.semesterNo': semesterNo, 'semesters.subjects.subjectName': subjectName },
//       {
//         $set: {
//           'semesters.$.subjects.$[subject].marks': marks,
//         },
//       },
//       {
//         arrayFilters: [{ 'subject.subjectName': subjectName }],
//         new: true,
//       }
//     );

//     res.json(updatedStudent);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


module.exports = router;