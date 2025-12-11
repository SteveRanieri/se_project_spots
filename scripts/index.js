//----Variables----
//Card image array
const initialCards = [
  { name: "Badlands, South Dakota", link: "images/7-Badlands.jpg" },
  { name: "Devil's Tower, Wyoming", link: "images/8-Devils-Tower.jpg" },
  { name: "Grotto Falls, Montana", link: "images/9-Grotto-Falls-MT.jpg" },
  {
    name: "Hyalite, Montana",
    link: "images/10-Hyalite.jpg",
  },
  { name: "Naples, Florida", link: "images/11-Naples-FL.jpg" },
  {
    name: "Puerto Viejo de Talamanca, Costa Rica",
    link: "images/12-Puerto-Viejo.jpg",
  },
];

//Card functionality
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

//Profile Modal
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeProfileModal = editProfileModal.querySelector(
  ".modal__close-button"
);

//Profile Modal Edit
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__paragraph");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name");
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description"
);

//New Post Modal
const newPostBtn = document.querySelector(".profile__post-button");
const newPostModal = document.querySelector("#new-post-modal");
const closePostModal = newPostModal.querySelector(".modal__close-button");
// New Post Modal Edit
const editPostForm = newPostModal.querySelector(".modal__form");
const editPostPhotoLink = newPostModal.querySelector("#post-image");
const editPostCaptionInput = newPostModal.querySelector("#post-caption");

//Preview Modal
const previewModal = document.querySelector("#preview-modal");
const previewModalText = previewModal.querySelector(".modal__image-caption");
const previewModalImage = previewModal.querySelector(".modal__image");
const closePreviewModal = previewModal.querySelector(".modal__close-button");

//Cards
function getCardElement(data) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const cardName = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like");
  const cardDeleteButton = cardElement.querySelector(".card__delete");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardName.textContent = data.name;

  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__like_liked");
  });

  cardDeleteButton.addEventListener("click", function () {
    cardDeleteButton.closest(".card").remove();
  });

  cardImage.addEventListener("click", function () {
    previewModalText.textContent = data.name;
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

//Card Image Loop
initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardsList.prepend(cardElement);
});

//Opening and closing Modals
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  modal.focus();
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

editProfileBtn.addEventListener("click", function () {
  openModal(editProfileModal);

  if (editProfileNameInput.value === "") {
    editProfileNameInput.value = profileName.textContent;
  }

  if (editProfileDescriptionInput.value === "") {
    editProfileDescriptionInput.value = profileDescription.textContent;
  }
});

newPostBtn.addEventListener("click", function () {
  openModal(newPostModal);
  resetValidation(editPostForm, [editPostPhotoLink, editPostCaptionInput]);
});

closeProfileModal.addEventListener("click", function () {
  closeModal(editProfileModal);
});

closePostModal.addEventListener("click", function () {
  closeModal(newPostModal);
});

closePreviewModal.addEventListener("click", function () {
  closeModal(previewModal);
});

const escapeKeyClose = (namedModal) => {
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closeModal(namedModal);
    }
  });
};

escapeKeyClose(editProfileModal);
escapeKeyClose(newPostModal);
escapeKeyClose(previewModal);

const outsideClickClose = (namedModal) => {
  namedModal.addEventListener("click", function (evt) {
    if (evt.target === namedModal) {
      closeModal(namedModal);
    }
  });
};

outsideClickClose(editProfileModal);
outsideClickClose(newPostModal);
outsideClickClose(previewModal);

//Edit Profile
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileNameInput.value;
  profileDescription.textContent = editProfileDescriptionInput.value;

  closeModal(editProfileModal);
  resetValidation(editProfileForm, [
    editProfileNameInput,
    editProfileDescriptionInput,
  ]);
  evt.target.reset();
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

//Add Photos
function handlePostFormSubmit(evt) {
  evt.preventDefault();

  const cardElement = getCardElement({
    name: editPostCaptionInput.value,
    link: editPostPhotoLink.value,
  });

  cardsList.prepend(cardElement);

  closeModal(newPostModal);
  const button = evt.target.querySelector(".modal__save-button");
  button.disabled = true;
  button.classList.add("modal__save-button_inactive");

  evt.target.reset();
}

editPostForm.addEventListener("submit", handlePostFormSubmit);
