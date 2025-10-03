//Card image array
const initialCards = [
  { name: "Badlands, South Dakota", link: "./images/7-Badlands.jpg" },
  { name: "Devil's Tower, Wyoming", link: "./images/8-Devils-Tower.jpg" },
  { name: "Grotto Falls, Montana", link: "./images/9-Grotto-Falls-MT.jpg" },
  {
    name: "Hyalite, Montana",
    link: "./images/10-Hyalite.jpg",
  },
  { name: "Naples, Florida", link: "./images/11-Naples-FL.jpg" },
  {
    name: "Puerto Viejo de Talamanca, Cost Rica",
    link: "./images/12-Puerto-Viejo.jpg",
  },
];

//Opening and closing Modals
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeProfileModal = editProfileModal.querySelector(
  ".modal__close-button"
);
const newPostBtn = document.querySelector(".profile__post-button");
const newPostModal = document.querySelector("#new-post-modal");
const closePostModal = newPostModal.querySelector(".modal__close-button");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileBtn.addEventListener("click", function () {
  openModal(editProfileModal);
  editProfileNameInput.value = profileName.textContent;
  editProfileDescriptionInput.value = profileDescription.textContent;
});

closeProfileModal.addEventListener("click", function () {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
});

closePostModal.addEventListener("click", function () {
  closeModal(newPostModal);
});

//Modal Profile Edit
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__paragraph");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name");
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description"
);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  console.log(editProfileNameInput.value);
  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

// Modal Post Edit
const editPostForm = newPostModal.querySelector(".modal__form");
const editPostPhotoLink = newPostModal.querySelector("#post-image");
const editPostCaptionInput = newPostModal.querySelector("#post-caption");

function handlePostFormSubmit(evt) {
  evt.preventDefault();
  console.log(editPostPhotoLink.value);
  console.log(editPostCaptionInput.value);
  closeModal(newPostModal);
  evt.target.reset();
}

editPostForm.addEventListener("submit", handlePostFormSubmit);

//Card Image Loop
initialCards.forEach((card) => console.log(card.name));
