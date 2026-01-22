//Validation Import and call
import {
  enableValidation,
  resetValidation,
  config,
} from "../scripts/validation.js";
enableValidation(config);

//----Variables----
//Card image array
import "./index.css";
import Api from "../utils/Api.js";
import badlandsImg from "../images/7-Badlands.jpg";
import devilsTowerImg from "../images/8-Devils-Tower.jpg";
import grottoFallsImg from "../images/9-Grotto-Falls-MT.jpg";
import hyaliteImg from "../images/10-Hyalite.jpg";
import naplesImg from "../images/11-Naples-FL.jpg";
import puertoViejoImg from "../images/12-Puerto-Viejo.jpg";

// const initialCards = [
//   { name: "Badlands, South Dakota", link: badlandsImg },
//   { name: "Devil's Tower, Wyoming", link: devilsTowerImg },
//   { name: "Grotto Falls, Montana", link: grottoFallsImg },
//   {
//     name: "Hyalite, Montana",
//     link: hyaliteImg,
//   },
//   { name: "Naples, Florida", link: naplesImg },
//   {
//     name: "Puerto Viejo de Talamanca, Costa Rica",
//     link: puertoViejoImg,
//   },
// ];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9abc2833-aa11-4aeb-bfc0-0e776ac373ec",
    "Content-Type": "application/json",
  },
});

api.getInitialCards().then((cards) => console.log(cards));

api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    cards.forEach((card) => {
      const cardElement = getCardElement(card);
      cardsList.prepend(cardElement);
    });

    const { about, avatar, name } = userInfo;
    profileAvatar.src = avatar;
    profileName.textContent = name;
    profileDescription.textContent = about;
    console.log(userInfo);
  })
  .catch((err) => {
    console.error(err);
  });

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
const profileAvatar = document.querySelector(".profile__avatar");

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

//Delete Modal
const deleteModal = document.querySelector("#delete-modal");
const closeDeleteModal = deleteModal.querySelectorAll(".js-modal-close");
const deleteButton = deleteModal.querySelector(".modal__delete-button");

//Cards
let selectedCard;
let selectedCardId;
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
    openModal(deleteModal); // cardDeleteButton.closest(".card").remove();
  });

  deleteButton.addEventListener("click", (evt) => {
    handleDeleteCard(cardElement, data);
  });

  cardImage.addEventListener("click", function () {
    previewModalText.textContent = data.name;
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function handleDeleteCard(cardElement, cardId) {
  selectedCard = cardElement;
  selectedCardId = cardId;
}

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

closeDeleteModal.forEach(function (button) {
  button.addEventListener("click", function () {
    closeModal(deleteModal);
  });
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
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;

      closeModal(editProfileModal);
    })
    .catch(console.error);
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
  console.log("Form submitted!");
  api
    .postNewCard({
      name: editPostCaptionInput.value,
      link: editPostPhotoLink.value,
    })
    .then((card) => {
      const cardElement = getCardElement(card);
      cardsList.prepend(cardElement);
      closeModal(newPostModal);
      console.log(card);
    })
    .catch(console.error);

  const button = evt.target.querySelector(".modal__save-button");
  button.disabled = true;
  button.classList.add("modal__save-button_inactive");

  evt.target.reset();
}

editPostForm.addEventListener("submit", handlePostFormSubmit);
