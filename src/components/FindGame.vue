<template>
  <div class="dropdown">
    <input v-model.trim="searchQuery" @keyup.enter="getList" class="dropdown-input" type="text" placeholder="Find game" />
    <div v-show="searchQuery && loaded && !hide" class="dropdown-list">
      <div v-for="item in itemList" :key="item.name" @click="emitValue(item.name)" class="dropdown-item">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import GamesService from '@/services/games.service';

export default {
  name: "FindGame",
  data () {
    return {
      searchQuery: '',
      itemList: null,
      loaded: false,
      hide: false
    }
  },
  methods: {
    getList () {
      GamesService.getListByName(this.searchQuery).then( response => {
        this.itemList = response.data;
        this.loaded = true;
        this.hide = false;
      });
    },
    emitValue(item)
    {
      this.$emit('gameSelected', item);
      this.searchQuery = item;
      this.hide = true;
    }
  }
}
</script>

<style>
.dropdown{
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 0 15px;
}
.dropdown-input, .dropdown-selected{
  width: 100%;
  padding: 10px 16px;
  border: 1px solid transparent;
  background: #edf2f7;
  line-height: 1.5em;
  outline: none;
  border-radius: 8px;
}
.dropdown-input:focus, .dropdown-selected:hover{
  background: #fff;
  border-color: #e2e8f0;
}
.dropdown-input::placeholder{
  opacity: 0.7;
}
.dropdown-selected{
  font-weight: bold;
  cursor: pointer;
}
.dropdown-list{
  position: absolute;
  z-index: 2;
  width: 100%;
  max-height: 500px;
  margin-top: 4px;
  overflow-y: auto;
  background: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}
.dropdown-item{
  display: flex;
  width: 100%;
  padding: 11px 16px;
  cursor: pointer;
}
.dropdown-item:hover{
  background: #edf2f7;
}
.dropdown-item-flag{
  max-width: 24px;
  max-height: 18px;
  margin: auto 12px auto 0px;
}
</style>