document.getElementById('generate-pdf').addEventListener('click', function() {
    const file = document.getElementById('csv-file').files[0];
    
    if (file) {
        // Parse CSV file using PapaParse
        Papa.parse(file, {
            complete: function (result) {
                const data = result.data;
                generatePDF(data);
            },
            header: true // if CSV has headers
        });
    }
});

function generatePDF(data) {
    // Ensure jsPDF is available
    const { jsPDF } = window.jspdf;  // Accessing jsPDF correctly
    const doc = new jsPDF();

    // Set up a simple table structure
    const columns = Object.keys(data[0]);
    const rows = data.map(row => columns.map(col => row[col]));

    // Add the table to the PDF
    doc.autoTable({
        head: [columns],
        body: rows
    });

    // Get current date in DD/MM/YYYY format
    const today = new Date();
    const dateString = today.toLocaleDateString('en-GB'); // 'en-GB' format is DD/MM/YYYY

    // Save the generated PDF with dynamic filename
    doc.save(`Bill(${dateString}).pdf`);
}
