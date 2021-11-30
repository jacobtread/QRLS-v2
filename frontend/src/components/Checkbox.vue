<template>
  <div :class="{'checkbox--checked':value}" class='checkbox' @click='value = !value'>
    <div class='checkbox__box'>
      <transition name='scale'>
        <Check v-if='value' class='checkbox__box__icon' icon='check' />
      </transition>
    </div>
    <p class='checkbox__text'>{{ text }}</p>
  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, toRef } from 'vue';
import Check from '@/assets/check.svg?inline';


export default defineComponent({
  emits: [ 'update:modelValue', 'change' ],
  props: {
    modelValue: { type: Boolean, default: false },
    text: { type: String, required: true },
  },
  components: { Check },
  setup(props, { emit }) {
    const modelValue = toRef(props, 'modelValue');
    const value = computed({
      get() {
        return modelValue.value;
      },
      set(value: boolean) {
        emit('update:modelValue', value);
        emit('change');
      },
    });
    return { value };
  },
});
</script>


<style lang='scss' scoped>
.checkbox {
  display: flex;
  text-align: left;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  color: #999;

  &__box {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 32px;
    height: 32px;
    margin-right: 0.5em;

    background: #333;
    border-radius: 12px;
    border: 2px solid #333;
    transition: all 0.5s ease;

    &:hover {
      border-color: #FFF;
    }

    .checkbox--checked & {
      background: #888;
      border-color: #888;
    }

    &__icon {
      color: white;
    }
  }

  &__text {
    flex: auto;
    user-select: none;

    font-size: 1.5rem;
  }
}
</style>