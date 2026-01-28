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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "9abc2833-aa11-4aeb-bfc0-0e776ac373ec",
    "Content-Type": "application/json",
  },
});

//Card functionality
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card-template");

//Profile Modal
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector("#edit-profile-modal");
const closeProfileModal = editProfileModal.querySelector(
  ".modal__close-button",
);

//Profile Modal Edit
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__paragraph");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector("#profile-name");
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description",
);
const profileAvatar = document.querySelector(".profile__avatar");

//Avatar Modal
const editAvatarButton = document.querySelector(".profile__avatar-button");
const avatarModal = document.querySelector("#avatar-modal");
const closeAvatarModal = avatarModal.querySelector(".modal__close-button");

//Avatar Modal Edit
const editAvatarForm = avatarModal.querySelector(".modal__form");
const editAvatarLink = avatarModal.querySelector("#profile-avatar-input");

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

//Initialization
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
    console.log("USer Info:", userInfo);
    console.log("Cards:", cards);
  })
  .catch(console.error);

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

  if (data.isLiked) {
    cardLikeButton.classList.add("card__like_liked");
  }

  cardLikeButton.addEventListener("click", (evt) => {
    handleLike(evt, data._id);
  });

  function handleLike(evt, id) {
    const likeButton = evt.target;
    const isLiked = likeButton.classList.contains("card__like_liked");

    api
      .toggleLike({ id, isLiked })
      .then(() => {
        likeButton.classList.toggle("card__like_liked");
      })
      .catch(console.error);
  }

  cardDeleteButton.addEventListener("click", (evt) => {
    handleDeleteCard(evt.target.closest(".card"), data);
  });

  cardImage.addEventListener("click", function () {
    previewModalText.textContent = data.name;
    previewModalImage.src = data.link;
    previewModalImage.alt = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function handleDeleteCard(cardElement, data) {
  selectedCard = cardElement;
  selectedCardId = data._id;
  openModal(deleteModal);
}

function handleDeleteSubmit() {
  renderLoading(true, deleteButton, "Deleting...");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();

      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, deleteButton);
    });
}

deleteButton.addEventListener("click", handleDeleteSubmit);

//Opening and closing Modals
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  modal.focus();
}
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
}

// Modal open buttons
const modalOpenButtons = [
  {
    button: editProfileBtn,
    modal: editProfileModal,
    onOpen: () => {
      editProfileNameInput.value = profileName.textContent;
      editProfileDescriptionInput.value = profileDescription.textContent;
    },
  },
  {
    button: editAvatarButton,
    modal: avatarModal,
    onOpen: () => resetValidation(editAvatarForm, [editAvatarLink]),
  },
  {
    button: newPostBtn,
    modal: newPostModal,
    onOpen: () =>
      resetValidation(editPostForm, [editPostPhotoLink, editPostCaptionInput]),
  },
];

modalOpenButtons.forEach(({ button, modal, onOpen }) => {
  button.addEventListener("click", () => {
    openModal(modal);
    if (onOpen) onOpen();
  });
});

// Modal close buttons
const modalCloseButtons = [
  { button: closeProfileModal, modal: editProfileModal },
  { button: closeAvatarModal, modal: avatarModal },
  { button: closePostModal, modal: newPostModal },
  { button: closePreviewModal, modal: previewModal },
];

modalCloseButtons.forEach(({ button, modal }) => {
  button.addEventListener("click", () => closeModal(modal));
});

// Delete modal close
closeDeleteModal.forEach((button) => {
  button.addEventListener("click", () => closeModal(deleteModal));
});

//Escape Ket Close
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    if (openModal) {
      closeModal(openModal);
    }
  }
});

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
outsideClickClose(deleteModal);
outsideClickClose(avatarModal);

// Loading text on button
function renderLoading(isLoading, button, loadingText = "Saving...") {
  if (isLoading) {
    button.dataset.originalText = button.textContent;
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    button.textContent = button.dataset.originalText;
    button.disabled = false;
  }
}

//Edit Profile
function handleProfileFormSubmit(evt) {
  const submitButton = evt.target.querySelector(".modal__save-button");
  evt.preventDefault();

  renderLoading(true, submitButton);

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
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitButton);
      evt.target.reset();
    });
  resetValidation(editProfileForm, [
    editProfileNameInput,
    editProfileDescriptionInput,
  ]);
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);

//Add Photos
function handlePostFormSubmit(evt) {
  const submitButton = evt.target.querySelector(".modal__save-button");
  evt.preventDefault();

  renderLoading(true, submitButton);

  api
    .postNewCard({
      name: editPostCaptionInput.value,
      link: editPostPhotoLink.value,
    })
    .then((card) => {
      const cardElement = getCardElement(card);
      cardsList.prepend(cardElement);
      closeModal(newPostModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitButton);
      evt.target.reset();
    });
}

editPostForm.addEventListener("submit", handlePostFormSubmit);

//Edit avatar
function handleAvatarSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector(".modal__save-button");
  renderLoading(true, submitButton);

  api
    .editAvatarImage({
      avatar: editAvatarLink.value,
    })
    .then((data) => {
      profileAvatar.src = data.avatar;
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      renderLoading(false, submitButton);
      evt.target.reset();
    });
}

editAvatarForm.addEventListener("submit", handleAvatarSubmit);
