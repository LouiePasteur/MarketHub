<template>
  <div class="search">
    <i class="fa-solid fa-magnifying-glass"></i>
    <input type="text" placeholder="Search for Stores" />
  </div>
</template>

<style lang="scss" scoped>
.search {
  position: relative;
  width: 30%;

  @media (max-width: 768px) {
    width: 100%;
  }

  & i {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: #94a3b8;
    cursor: pointer;

    @media (max-width: 768px) {
      transform: translateY(-105%);
    }
  }

  & input {
    width: 100%;
    height: 35px;
    padding: 0 32px 0 10px;
    border-radius: 5px;
    border-color: var(--border);

    @media (max-width: 768px) {
      margin-bottom: 20px;
    }
  }
}
</style>
