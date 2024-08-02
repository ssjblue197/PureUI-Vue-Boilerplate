<template>
  <div id="sidebar">
    <div class="navigation flex flex-col gap-6 px-6 pt-8">
      <div class="header">
        <img
          src="@/assets/images/logo.png"
          alt="logo"
          class="h-auto w-full"
        />
      </div>
      <div class="search">
        <p-input
          placeholder="Search"
          filled
          class="bg-transparent"
        >
          <p-icon slot="prefix" name="search"></p-icon>
        </p-input>
      </div>
      <div class="menu flex flex-col gap-1">
        <div
          class="menu-item flex items-center gap-2 px-2 py-3"
        ></div>
      </div>
    </div>
    <div class="footer px-6"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#sidebar {
  @apply flex h-full min-w-[80px] max-w-[280px] flex-col bg-brand-700;
}
</style>
