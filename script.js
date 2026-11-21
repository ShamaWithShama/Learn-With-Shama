const SUPABASE_URL = "https://ermzrekcggfkwsqinnae.supabase.co";
const SUPABASE_KEY = "sb_publishable_sXjW4HL1d8EZ1fPodhusbw_cMQWBfUN";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("Learn with Shama connected to Supabase!");
// SWITCH BETWEEN LOGIN AND REGISTRATION
function showAuth(type) {
    document.getElementById("login-form").style.display =
        type === "login" ? "block" : "none";

    document.getElementById("register-form").style.display =
        type === "register" ? "block" : "none";
}

// STUDENT REGISTRATION
document.getElementById("register-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("student-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    const { data, error } = await supabaseClient.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                full_name: name
            }
        }
    });

    if (error) {
        alert(error.message);
    } else {
        alert("Registration successful! Please check your email to confirm your account.");
    }
});

// STUDENT LOGIN
document.getElementById("login-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert(error.message);
    } else {
        alert("Welcome to Learn with Shama!");
    }
});