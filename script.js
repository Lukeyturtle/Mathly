// script.js

document.querySelectorAll('.block').forEach(block => {
  block.addEventListener('dragstart', dragStart);
});

const dropArea = document.querySelector('.code-area');
dropArea.addEventListener('dragover', allowDrop);
dropArea.addEventListener('drop', drop);

function dragStart(event) {
  event.dataTransfer.setData('text/plain', event.target.dataset.code);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const code = event.dataTransfer.getData('text/plain');
  const codeBlock = document.createElement('div');
  codeBlock.classList.add('dropped-code');
  codeBlock.textContent = code;
  dropArea.appendChild(codeBlock);
}

function runCode() {
  const codeBlocks = document.querySelectorAll('.code-area .dropped-code');
  let codeToRun = '';
  codeBlocks.forEach(block => {
    codeToRun += block.textContent + '\n';
  });
  try {
    eval(codeToRun);
  } catch (error) {
    console.error('Error in code execution:', error);
  }
}