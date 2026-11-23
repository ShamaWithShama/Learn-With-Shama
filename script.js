
const SUPABASE_URL = "https://ermzrekcggfkwsqinnae.supabase.co";
const SUPABASE_KEY = "sb_publishable_sXjW4HL1d8EZ1fPodhusbw_cMQWBfUN";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

// SWITCH BETWEEN LOGIN AND REGISTRATION
function showAuth(type) {
    document.getElementById("login-form").style.display =
        type === "login" ? "block" : "none";

    document.getElementById("register-form").style.display =
        type === "register" ? "block" : "none";

    document.getElementById("register-login-link").style.display =
        type === "register" ? "block" : "none";

    document.getElementById("login-register-link").style.display =
        type === "login" ? "block" : "none";
}

// LOGIN AND REGISTRATION SWITCHES
document.getElementById("switchToLogin").addEventListener("click", () => {
    showAuth("login");
});

document.getElementById("switchToRegister").addEventListener("click", () => {
    showAuth("register");
});

// DISPLAY STUDENT NAME
function updateStudentName(user) {
    const name =
        user?.user_metadata?.full_name ||
        user?.email?.split("@")[0] ||
        "Student";

    document.getElementById("student-greeting").textContent =
        `Welcome back, ${name}!`;
}

// SHOW DASHBOARD
function showDashboard(user) {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("student-auth").style.display = "none";
    document.getElementById("student-dashboard").style.display = "block";

    document.getElementById("feature-view").style.display = "none";

    updateStudentName(user);
}

// SHOW LOGIN PAGE
function showLoginPage() {
    document.getElementById("welcome").style.display = "block";
    document.getElementById("student-auth").style.display = "flex";
    document.getElementById("student-dashboard").style.display = "none";

    showAuth("register");
}

// STUDENT REGISTRATION
document.getElementById("register-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("student-name").value.trim();
    const email = document.getElementById("register-email").value.trim();
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
        return;
    }

    if (data.session) {
        alert("Registration successful! Welcome to Learn with Shama.");
        showDashboard(data.user);
    } else {
        alert("Registration successful! Please check your email to confirm your account before logging in.");
        showAuth("login");
    }
});

// STUDENT LOGIN
document.getElementById("login-form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (error) {
        alert(error.message);
        return;
    }

    alert("Welcome to Learn with Shama!");

    showDashboard(data.user);
});


// SUBJECT TOPICS
const subjectTopics = {
    "Biology": [
        {
            title: "Introduction to Biology",
            content: "Biology is the scientific study of living organisms. It examines their structure, functions, growth, reproduction and interaction with the environment."
        },
        {
            title: "Characteristics of Living Things",
            content: "Living organisms carry out life processes such as movement, respiration, sensitivity, growth, reproduction, excretion and nutrition."
        },
        {
            title: "Cells",
            content: "The cell is the basic structural and functional unit of life. Plant and animal cells have structures that perform different functions."
        },
        {
            title: "Nutrition",
            content: "Nutrition is the process by which organisms obtain and use nutrients for energy, growth and repair."
        }
    ],

    "Chemistry": [
        {
            title: "Introduction to Chemistry",
            content: "Chemistry is the study of matter, its properties, composition and the changes it undergoes."
        },
        {
            title: "States of Matter",
            content: "Matter commonly exists as solids, liquids and gases. These states differ in particle arrangement, movement and energy."
        },
        {
            title: "Elements, Compounds and Mixtures",
            content: "An element contains one type of atom. A compound contains chemically combined elements, while a mixture contains substances that are not chemically combined."
        },
        {
            title: "Atoms and Molecules",
            content: "Atoms are the basic units of elements. Molecules consist of two or more atoms chemically bonded together."
        }
    ],

    "Mathematics": [
        {
            title: "Numbers and Number Operations",
            content: "Numbers are used for counting, measuring and calculating. The four basic operations are addition, subtraction, multiplication and division."
        },
        {
            title: "Fractions",
            content: "A fraction represents part of a whole. It consists of a numerator and a denominator."
        },
        {
            title: "Percentages",
            content: "A percentage is a way of expressing a number as a fraction of 100."
        },
        {
            title: "Algebra",
            content: "Algebra uses letters and symbols to represent unknown values and mathematical relationships."
        }
    ],

    "Physical Education": [
        {
            title: "Introduction to Physical Education",
            content: "Physical Education involves learning about physical activity, movement, fitness, health and the human body."
        },
        {
            title: "Components of Fitness",
            content: "Health-related fitness includes cardiovascular endurance, muscular strength, muscular endurance, flexibility and body composition."
        },
        {
            title: "The Skeletal System",
            content: "The skeletal system provides support, protects internal organs, allows movement and produces blood cells."
        },
        {
            title: "The Circulatory System",
            content: "The circulatory system transports blood, oxygen, nutrients and waste products around the body."
        }
    ]
};

// DASHBOARD FEATURE NAVIGATION
document.querySelectorAll("[data-feature]").forEach(button => {

    button.addEventListener("click", function() {

        const feature = this.dataset.feature;

        document.getElementById("student-dashboard")
            .querySelectorAll(".dashboard-section, .dashboard-welcome, .dashboard-top, .daily-challenge")
            .forEach(section => {
                section.style.display = "none";
            });

        document.getElementById("feature-view").style.display = "block";

        document.getElementById("feature-title").textContent = feature;

        const description = document.getElementById("feature-description");
        const learningArea = document.getElementById("subject-learning-area");
        const topicList = document.getElementById("topic-list");
        const topicContent = document.getElementById("topic-content");

        if (subjectTopics[feature]) {

            description.textContent =
                `Welcome to ${feature}. Choose a topic below to begin learning.`;

            learningArea.style.display = "block";
            topicList.innerHTML = "";
            topicContent.innerHTML = `
                <h3>Choose a topic to begin</h3>
                <p>Your learning content will appear here.</p>
            `;

            subjectTopics[feature].forEach(topic => {

                const topicButton = document.createElement("button");

                topicButton.textContent = topic.title;
                topicButton.className = "topic-button";

                topicButton.addEventListener("click", function() {

                    topicContent.innerHTML = "";

                    const heading = document.createElement("h3");
                    heading.textContent = topic.title;

                    const paragraph = document.createElement("p");
                    paragraph.textContent = topic.content;

                    topicContent.appendChild(heading);
                    topicContent.appendChild(paragraph);
                });

                topicList.appendChild(topicButton);

            });

        } else {

            learningArea.style.display = "none";

            description.textContent =
                `Welcome to ${feature}. We will develop this learning space next.`;
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

});

// BACK TO DASHBOARD
document.getElementById("backToDashboard").addEventListener("click", function() {

    document.getElementById("feature-view").style.display = "none";

    document.querySelectorAll(
        ".dashboard-section, .dashboard-welcome, .dashboard-top, .daily-challenge"
    ).forEach(section => {
        section.style.display = "";
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

// STUDENT LOGOUT
document.getElementById("logoutBtn").addEventListener("click", async function() {

    const { error } = await supabaseClient.auth.signOut();

    if (error) {
        alert(error.message);
        return;
    }

    alert("You have logged out successfully.");

    showLoginPage();
});

// CHECK EXISTING LOGIN SESSION
async function checkSession() {

    const { data, error } = await supabaseClient.auth.getSession();

    if (error) {
        console.error("Session error:", error.message);
        showLoginPage();
        return;
    }

    if (data.session) {
        await checkAdminAccess();
        showDashboard(data.session.user);
    } else {
        showLoginPage();
    }
}

// LISTEN FOR AUTHENTICATION CHANGES
supabaseClient.auth.onAuthStateChange(async (event, session) => {

    if (event === "SIGNED_OUT" || !session) {
        document.getElementById("admin-panel").style.display = "none";
        showLoginPage();
        return;
    }

    if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        await checkAdminAccess();
        showDashboard(session.user);
    }

});

// INITIALISE PORTAL
checkSession();

console.log("Learn with Shama student portal connected!");

// ADMIN PANEL ACCESS
async function checkAdminAccess() {
    const { data: { user } } = await supabaseClient.auth.getUser();

    const adminPanel = document.getElementById("admin-panel");

    if (!adminPanel) return;

    adminPanel.style.display = "none";

    if (!user) return;

    const { data, error } = await supabaseClient
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .single();

    if (error) {
        console.error("Admin access check:", error);
        return;
    }

    if (data && data.role === "admin") {
        adminPanel.style.display = "block";
    }
}
