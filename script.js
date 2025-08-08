const supabaseUrl = 'https://anrgjgfhfhqjcozigtnd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFucmdqZ2ZoZmhxamNvemlndG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3OTE1MjgsImV4cCI6MjA2OTM2NzUyOH0.HfA-xAqBEJFMpLkAq0Z5c-HQMgb-l_G-b1pCl8jAGtk';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let editingItemId = null;
const form = document.getElementById('itemForm');

window.addEventListener("DOMContentLoaded", fetchData);

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (editingItemId) {
        await updateData(editingItemId);
        alert('Item updated successfully!');
        editingItemId = null;
    } else {
        await insertData();
        alert('Item added successfully!');
    }

    const modal = bootstrap.Modal.getInstance(document.getElementById('addItemModal'));
    modal.hide();
    form.reset();
    fetchData();
});

async function insertData() {
    let item_name = document.querySelector("#itemName").value;
    let item_price = document.querySelector("#itemPrice").value;
    let item_desc = document.querySelector("#itemDescription").value;
    let imageFile = document.querySelector("#itemImage").files[0];

    if (!imageFile) {
        alert("Please select an image");
        return;
    }

    const base64Image = await toBase64(imageFile);

    const { data, error } = await supabase
        .from('items')
        .insert({
            item_name,
            item_price,
            item_desc,
            item_image: base64Image
        });

    if (error) {
        console.error(error);
        alert("Error inserting data!");
    } else {
        console.log(data);
    }
}

async function updateData(id) {
    let item_name = document.querySelector("#itemName").value;
    let item_price = document.querySelector("#itemPrice").value;
    let item_desc = document.querySelector("#itemDescription").value;
    let imageFile = document.querySelector("#itemImage").files[0];

    let updatedFields = {
        item_name,
        item_price,
        item_desc
    };

    if (imageFile) {
        const base64Image = await toBase64(imageFile);
        updatedFields.item_image = base64Image;
    }

    const { error } = await supabase
        .from('items')
        .update(updatedFields)
        .eq('id', id);

    if (error) {
        console.error(error);
        alert("Error updating data!");
    }
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

async function fetchData() {
    const { data, error } = await supabase
        .from('items')
        .select("*");

    if (error) {
        console.log("Error:", error);
    } else {
        let container = document.querySelector("#itemsContainer");
        container.innerHTML = "";

     data.forEach((item) => {
    container.innerHTML += `
  <div class="col-md-4">
    <div class="card p-3">
        <img src="${item.item_image}" class="card-img-top mb-2" alt="Item Image" style="height:150px; object-fit:cover;">
        <h5>${item.item_name}</h5>
        <h6>Price: ${item.item_price}</h6>
        <p>${item.item_desc}</p>
        <div class="d-flex justify-content-between mt-2">
          <button class="btn btn-sm btn-warning" onclick="editItem(${item.id})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteItem(${item.id})">Delete</button>
        </div>
    </div>
  </div>
`;
});

    }
}
async function deleteItem(id) {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(error);
        alert("Error deleting item!");
    } else {
        alert("Item deleted successfully!");
        fetchData();
    }
}

async function editItem(id) {
    const { data, error } = await supabase
        .from('items')
        .select("*")
        .eq('id', id)
        .single();

    if (error) {
        alert("Failed to load item.");
        return;
    }

    // Fill form with item data
    document.querySelector("#itemName").value = data.item_name;
    document.querySelector("#itemPrice").value = data.item_price;
    document.querySelector("#itemDescription").value = data.item_desc;
    editingItemId = id;

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('addItemModal'));
    modal.show();
}


    if (window.location.hash.includes('type=signup')) {
        // Direct login.html par bhej do
        window.location = "login.html";
    }
    console.log(window.location.hash)
    const sbtn = document.querySelector("#signupBtn");

    if (sbtn) {
        sbtn.addEventListener("click", async () => {
            const email = document.getElementById('semail').value;
            const password = document.getElementById('spassword').value;

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                console.log(error);
                alert(error.message);
            } else {
                alert("Signup successful! Please verify your email before logging in.");
            }
        });
    }

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
                window.location.href = "index.html"; // ✅ Corrected
            }
        });
}

