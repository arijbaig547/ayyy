const supabaseUrl = 'https://anrgjgfhfhqjcozigtnd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucmdqZ2ZoZmhxamNvemlndG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3OTE1MjgsImV4cCI6MjA2OTM2NzUyOH0.HfA-xAqBEJFMpLkAq0Z5c-HQMgb-l_G-b1pCl8jAGtk';

// ✅ Correct way with CDN script
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

const lbtn = document.querySelector("#lbtn");

if (lbtn) {
    lbtn.addEventListener("click", async () => {
        const email = document.getElementById('lemail').value;
        const password = document.getElementById('lpassword').value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert("Login failed: " + error.message);
        } else {
            alert("Login successful!");
            window.location.href = "index.html";
        }
    });
}
