// Supabase ka client create karo
const supabaseUrl = 'https://anrgjgfhfhqjcozigtnd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucmdqZ2ZoZmhxamNvemlndG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3OTE1MjgsImV4cCI6MjA2OTM2NzUyOH0.HfA-xAqBEJFMpLkAq0Z5c-HQMgb-l_G-b1pCl8jAGtk';

// ✅ Correct way: supabase.createClient
const sb = supabase.createClient(supabaseUrl, supabaseKey);

// Sirf tab chale jab signupBtn exist kare
if (document.querySelector("#signupBtn")) {
    const sbtn = document.querySelector("#signupBtn");

    sbtn.addEventListener("click", async () => {
        const email = document.getElementById('semail').value.trim();
        const password = document.getElementById('spassword').value.trim();

        if (!email || !password) {
            alert("Please fill in both fields.");
            return;
        }

        const { data, error } = await sb.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.log(error);
            alert(error.message);
        } else {
            alert("Signup successful! Please check your email for verification.");
           
        }
    });
}
