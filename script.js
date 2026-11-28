
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

    button.addEventListener("click", async function() {

        const feature = this.dataset.feature;
        console.log("Selected subject:", feature);

        document.getElementById("student-dashboard")
            .querySelectorAll(".dashboard-section, .dashboard-welcome, .dashboard-top, .daily-challenge")
            .forEach(section => {
                section.style.display = "none";
            });
        const adminPanel = document.getElementById("admin-panel");

if (adminPanel) {
    adminPanel.style.display = "none";
}

        document.getElementById("feature-view").style.display = "block";
        document.getElementById("topic-list").innerHTML = "";
document.getElementById("topic-content").innerHTML = "";
document.getElementById("subject-learning-area").style.display = "block";
document.getElementById("feature-description").textContent = "";

        document.getElementById("feature-title").textContent = feature;

        const description = document.getElementById("feature-description");
        const learningArea = document.getElementById("subject-learning-area");
        const topicList = document.getElementById("topic-list");
        const topicContent = document.getElementById("topic-content");

        if (subjectTopics[feature]) {

            description.textContent =
                `Welcome to ${feature}. Choose a topic below to begin learning.`;

            learningArea.style.display = "block";
            topicList.innerHTML = "Loading published topics...";

            topicContent.innerHTML = `
                <h3>Choose a topic to begin</h3>
                <p>Your learning content will appear here.</p>
            `;

            const { data, error } = await supabaseClient
                .from("topics")
                .select("title, content")
                .eq("subject", feature)
                .eq("is_published", true)
                .order("created_at", { ascending: false });
            console.log("Selected feature:", feature);
console.log("Topics returned:", data);

            if (error) {

                console.error("Loading student topics:", error);

                topicList.textContent =
                    "Could not load topics. Please try again.";

                return;
            }

            topicList.innerHTML = "";

            if (!data || data.length === 0) {

                topicList.textContent =
                    "No published topics are available yet.";

                return;
            }

            data.forEach(topic => {

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
        const adminPanel = document.getElementById("admin-panel");

        if (adminPanel) {
            adminPanel.style.display = "none";
        }

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
    await loadAdminTopics();
    await loadAdminAssignments();
}

}
 
// =====================================
// LEARN WITH SHAMA - ADMIN TOPIC SYSTEM
// =====================================

// SAVE NEW TOPICS
const topicForm = document.getElementById("add-topic-form");

if (topicForm) {

    topicForm.addEventListener("submit", async function(e) {

        e.preventDefault();

        const message = document.getElementById("admin-message");
        const saveButton = topicForm.querySelector('button[type="submit"]');

        const subject = document.getElementById("topic-subject").value;
        const title = document.getElementById("topic-title").value.trim();
        const content = document.getElementById("topic-content-input").value.trim();
        const isPublished = document.getElementById("topic-published").checked;

        if (!subject || !title || !content) {
            message.textContent = "Please complete all fields.";
            return;
        }

        saveButton.disabled = true;
        saveButton.textContent = "Saving...";

        try {

            const { data: { user }, error: userError } =
                await supabaseClient.auth.getUser();

            if (userError || !user) {
                throw new Error("Please log in again.");
            }

            const { error } = await supabaseClient
                .from("topics")
                .insert({
                    subject: subject,
                    title: title,
                    content: content,
                    is_published: isPublished,
                    created_by: user.id
                });

            if (error) {
                throw error;
            }

            message.textContent = "Topic saved successfully!";

            topicForm.reset();

            await loadAdminTopics();

        } catch (error) {

            console.error("Topic saving error:", error);

            message.textContent = "Could not save topic: " + error.message;

        } finally {

            saveButton.disabled = false;
            saveButton.textContent = "Save Topic";

        }

    });

}
// =====================================
// SAVE NEW ASSIGNMENTS
// =====================================

const assignmentForm = document.getElementById("save-assignment");

if (assignmentForm) {

    assignmentForm.addEventListener("click", async function(e) {

        e.preventDefault();

        const saveButton = assignmentForm;
        const subject = document.getElementById("assignment-subject").value;
        const title = document.getElementById("assignment-title").value.trim();
        const instructions = document.getElementById("assignment-instructions").value.trim();
        const deadline = document.getElementById("assignment-deadline").value;
        const isPublished = document.getElementById("assignment-published").checked;

        if (!subject || !title || !instructions || !deadline) {
            alert("Please complete all assignment fields.");
            return;
        }

        saveButton.disabled = true;
        saveButton.textContent = "Saving...";

        try {

            const { error } = await supabaseClient
                .from("assignments")
                .insert({
                    subject: subject,
                    title: title,
                    instructions: instructions,
                    deadline: deadline,
                    is_published: isPublished
                });

            if (error) throw error;

            alert("Assignment saved successfully!");

            document.getElementById("assignment-subject").value = "";
            document.getElementById("assignment-title").value = "";
            document.getElementById("assignment-instructions").value = "";
            document.getElementById("assignment-deadline").value = "";
            document.getElementById("assignment-published").checked = false;

            await loadAdminAssignments();

        } catch (error) {

            console.error("Assignment saving error:", error);
            alert("Could not save assignment: " + error.message);

        } finally {

            saveButton.disabled = false;
            saveButton.textContent = "Save Assignment";

        }

    });

}


// LOAD EXISTING TOPICS
async function loadAdminTopics() {

    const topicList = document.getElementById("admin-topic-list");

    if (!topicList) return;

    topicList.textContent = "Loading topics...";

    const { data, error } = await supabaseClient
        .from("topics")
        .select("id, subject, title, is_published, created_at")
        .order("created_at", { ascending: false });

    if (error) {

        console.error("Loading topics error:", error);

        topicList.textContent = "Could not load topics: " + error.message;

        return;
    }

    topicList.innerHTML = "";

    if (!data || data.length === 0) {

        topicList.textContent = "No topics have been saved yet.";

        return;
    }

    data.forEach(topic => {

        const item = document.createElement("div");

        const heading = document.createElement("h4");
        heading.textContent = topic.title;

        const subject = document.createElement("p");
        subject.textContent = "Subject: " + topic.subject;

        const status = document.createElement("p");
        status.textContent = topic.is_published
            ? "Status: Published"
            : "Status: Unpublished";

        item.appendChild(heading);
        item.appendChild(subject);
        item.appendChild(status);

        topicList.appendChild(item);

    });

}
// =====================================
// LOAD EXISTING ASSIGNMENTS
// =====================================

async function loadAdminAssignments() {

    const assignmentList = document.getElementById("admin-assignment-list");

    if (!assignmentList) return;

    assignmentList.textContent = "Loading assignments...";

    const { data, error } = await supabaseClient
        .from("assignments")
        .select("id, subject, title, deadline, is_published, created_at")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Loading assignments error:", error);
        assignmentList.textContent = "Could not load assignments: " + error.message;
        return;
    }

    assignmentList.innerHTML = "";

    if (!data || data.length === 0) {
        assignmentList.textContent = "No assignments have been saved yet.";
        return;
    }

    data.forEach(assignment => {

        const item = document.createElement("div");

        const heading = document.createElement("h4");
        heading.textContent = assignment.title;

        const subject = document.createElement("p");
        subject.textContent = "Subject: " + assignment.subject;

        const deadline = document.createElement("p");
        deadline.textContent =
            "Deadline: " + new Date(assignment.deadline).toLocaleString();

        const status = document.createElement("p");
        status.textContent = assignment.is_published
            ? "Status: Published"
            : "Status: Unpublished";

        item.appendChild(heading);
        item.appendChild(subject);
        item.appendChild(deadline);
        item.appendChild(status);

        assignmentList.appendChild(item);

    });

}

    // START CHECKING LOGIN SESSION
checkSession();

