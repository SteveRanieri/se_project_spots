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

//Card functionality
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

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

  return cardElement;
}

//Card Image Loop
initialCards.forEach((card) => {
  const cardElement = getCardElement(card);
  cardsList.prepend(cardElement);
});

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

  const cardElement = getCardElement({
    name: editPostCaptionInput.value,
    link: editPostPhotoLink.value,
  });
  cardsList.prepend(cardElement);

  closeModal(newPostModal);
  evt.target.reset();
}

editPostForm.addEventListener("submit", handlePostFormSubmit);
