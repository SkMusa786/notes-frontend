const API = "https://notes-backend-zelh.onrender.com/api/notes";

async function fetchNotes() {
    try {
        const res = await fetch(API);
        const notes = await res.json();

        document.getElementById("notes").innerHTML =
            notes.map(note => `
                <div class="note">
                    <h3>${note.title}</h3>
                    <p>${note.content}</p>

                    <button
                        class="delete-btn"
                        onclick="deleteNote('${note._id}')"
                    >
                        Delete
                    </button>
                </div>
            `).join("");
    } catch (err) {
        console.log(err);
    }
}

async function addNote() {

    const title =
        document.getElementById("title").value;

    const content =
        document.getElementById("content").value;

    if (!title || !content) {
        alert("Please fill all fields");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            content
        })
    });

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";

    fetchNotes();
}

async function deleteNote(id) {

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    fetchNotes();
}

fetchNotes();