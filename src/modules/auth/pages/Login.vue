<template>
  <div class="wrapper flex items-center">
    <div class="relative h-full flex-1">
      <LoginForm />
    </div>
    <div
      class="relative hidden h-full flex-1 overflow-hidden py-3xl md:block"
    >
      <p-carousel
        class="slider"
        autoplay
        loop
        :autoplayInterval="5000"
      >
        <template v-for="i in local.slideList" :key="i">
          <p-carousel-item class="slider-item">
            <div
              class="relative flex h-full w-full flex-col justify-end bg-gray-100"
            >
              <img
                :src="i?.image"
                alt="login-bg"
                class="h-full w-full object-cover"
              />
              <div
                class="absolute bottom-0 left-0 flex h-min w-full flex-col gap-4xl border-t border-[rgba(255,255,255,0.3)] bg-[rgba(255,255,255,0.3)] p-4xl backdrop-blur"
              >
                <div
                  class="w-full text-title-sm font-semibold text-white"
                >
                  {{ i?.text }}
                </div>
                <div
                  class="relative flex w-full flex-col gap-lg"
                >
                  <div class="flex w-full justify-between">
                    <span
                      class="text-title-md font-semibold text-white"
                    >
                      {{ i?.author }}
                    </span>
                    <p-rating
                      readonly
                      :value="i?.rating"
                      precision="0.5"
                      style="
                        --symbol-color-active: var(
                          --p-color-yellow-500
                        );
                      "
                    ></p-rating>
                  </div>
                </div>
                <div
                  class="relative flex w-full justify-between"
                >
                  <div
                    class="flex flex-col items-start gap-xs"
                  >
                    <span
                      class="text-lg font-semibold text-white"
                    >
                      {{ i?.role }}
                    </span>
                    <span
                      class="text-md font-medium text-white"
                    >
                      {{ i?.company }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </p-carousel-item>
        </template>
      </p-carousel>
      <div
        class="absolute bottom-6xl right-3xl flex h-14 w-min items-center gap-2xl"
      >
        <p-button
          variant="default"
          size="large"
          circle
          class="navigation_button"
          @click="handleNavigate(-1)"
        >
          <p-icon
            name="arrow-left"
            label="Settings"
          ></p-icon>
        </p-button>
        <p-button
          variant="default"
          size="large"
          circle
          class="navigation_button"
          @click="handleNavigate(+1)"
        >
          <p-icon
            name="arrow-right"
            label="Settings"
          ></p-icon>
        </p-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/modules/auth/components/LoginForm.vue';
import { $ } from '@/utils/helper';
import { reactive } from 'vue';

interface Slide {
  image?: string;
  author?: string;
  role?: string;
  company?: string;
  text?: string;
  rating?: number;
}
interface Local {
  slideList: Slide[];
}

const local: Local = reactive({
  slideList: [
    {
      image: '/images/slide-1.jpg',
      author: 'Lula Meyers',
      role: 'Product Manager, Hourglass',
      company: 'PODcrypto',
      text: `“Your software has saved us thousands of hours of work. We’re able to spin up projects faster and take on more clients.”`,
      rating: 5,
    },
    {
      image: '/images/slide-2.jpg',
      author: 'Amélie Laurent',
      role: 'Lead Designer, Layers',
      company: 'Web Development Agency',
      text: '“We’ve been using Untitled to kick start every new project and can’t imagine working without it.”',
      rating: 5,
    },
    {
      image: '/images/slide-3.jpg',
      author: 'Lula Meyers',
      role: 'Product Manager, Hourglass',
      company: 'Web Design Agency',
      text: '“Untitled has saved us thousands of hours of work. We’re able to spin up projects  faster and take on more clients.”',
      rating: 4.5,
    },
    {
      image: '/images/slide-4.jpg',
      author: 'Fleur Cook',
      role: 'Founder, Catalog ',
      company: 'Web Design Agency',
      text: '“We’ve been using Untitled to kick start every new project and can’t imagine working without it. It’s incredible.”',
      rating: 5,
    },
  ],
});

const handleNavigate = (value: number) => {
  const slider = $('.slider') as any;
  if (value < 0) {
    slider?.previous();
  } else {
    slider?.next();
  }
};
</script>

<style scoped>
.slider {
  height: 100%;
}
.slider::part(base) {
  width: 100%;
  height: 100%;
}

.slider-item {
  height: 100%;
  --aspect-ratio: auto;
  object-fit: cover;
}

.navigation_button::part(base) {
  height: 56px !important;
  width: 56px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  background-color: transparent !important;
  border-color: white !important;
  color: white !important;
}
</style>
