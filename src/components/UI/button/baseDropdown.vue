<template>
  <div class="dropdown">
    <button class="btn-base btn btn btn-warning btn-md btn-multiple-state btn-shadow" type="button" @click="toggleDropdown">
      {{ selectedText }}
    </button>
    <ul class="dropdown-menu" v-show="isOpen">
      <li v-for="(item, index) in items" :key="index" @click="selectItem(item)">
        <a class="dropdown-item" href="#">{{ item.label }}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BaseDropdown',
  props: {
    items: {
      type: Array,
      required: true
    },
    defaultText: {
      type: String,
      default: 'Select'
    }
  },
  data() {
    return {
      isOpen: false,
      selectedText: this.defaultText
    };
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    selectItem(item) {
      this.selectedText = item.label;
      this.isOpen = false;
      this.$emit('select', item);
    }
  }
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 8px 32px;
  font-weight: bold;
  cursor: pointer;
}

.dropdown-menu {
  display: block;
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.dropdown-item {
  padding: 10px;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}
</style>
