const tagElements = document.querySelectorAll('.tag');
const tagField = document.querySelector('#tagField');
const tagsId = document.querySelector('#tagsId');

for (const tag of tagElements) {
  tag.addEventListener('click', function () {
    tagField.value += this.innerText + ',';
    tagsId.value += this.getAttribute('id') + ',';
  });
}
