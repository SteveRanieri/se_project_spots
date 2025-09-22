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

//Modal Profile Edit
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__paragraph");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name");
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description"
);

editProfileNameInput.value = profileName.textContent;
editProfileDescriptionInput.value = profileDescription.textContent;

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  console.log(editProfileNameInput.value);
  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;
  editProfileModal.classList.remove("modal_is-opened");
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
  newPostModal.classList.remove("modal_is-opened");
}

editPostForm.addEventListener("submit", handlePostFormSubmit);
