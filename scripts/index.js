//Opening and closing Modals
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeProfileModal = editProfileModal.querySelector(
  ".modal__close-button"
);
const newPostBtn = document.querySelector(".profile__post-button");
const newPostModal = document.querySelector("#new-post-modal");
const closePostModal = newPostModal.querySelector(".modal__close-button");

editProfileBtn.addEventListener("click", function () {
  editProfileModal.classList.add("modal_is-opened");
});

closeProfileModal.addEventListener("click", function () {
  editProfileModal.classList.remove("modal_is-opened");
});

newPostBtn.addEventListener("click", function () {
  newPostModal.classList.add("modal_is-opened");
});

closePostModal.addEventListener("click", function () {
  newPostModal.classList.remove("modal_is-opened");
});

//Modal inputs
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__paragraph");
const profileNameInput = editProfileModal.querySelector("#profile-name");
const profileDescriptionInput = editProfileModal.querySelector(
  "#profile-description"
);

profileNameInput.value = profileName.textContent;
profileDescriptionInput.value = profileDescription.textContent;

// const profileFormElement = editProfileModal.querySelector(".modal__form");
// const nameInput = profileFormElement.querySelector("#profile-name");
// const jobInput = profileFormElement.querySelector("#profile-description");
