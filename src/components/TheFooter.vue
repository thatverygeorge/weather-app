<template>
  <footer class="footer">
    <div class="footer__container">
      <span class="made-by footer__made-by">
        made by
        <a
          class="made-by__link"
          href="https://github.com/thatverygeorge"
          target="_blank"
          rel="noopener noreferrer"
        >
          @thatverygeorge
        </a>
      </span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  flex-shrink: 0;
  background-color: var(--green);
}

.footer__container {
  max-width: var(--max-content-width);
  min-height: 85px;
  display: grid;
  gap: 1rem;
  align-items: center;
  margin: 0 auto;
  padding: 1rem;
}

.made-by {
  font-size: 1rem;
  color: white;
  text-align: end;
}

.made-by__link {
  color: white;
}
</style>
