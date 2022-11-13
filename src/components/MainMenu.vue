<script setup>
import { RouterLink} from 'vue-router'
</script>

<template>
  <header id="main-menu" role="banner">
    <div class="wrapper m-72em at-center d-flex justify-content-between align-items-center">
      <div class="d-flex justify-content-between align-items-center">
        <h1><a target="_blank" href="https://bzgzs.cn/">斌政工作室</a></h1>
        <h4>下载中心 | Download Center</h4>
      </div>
      <button class="top-menu-button" v-on:click="buttonClick" aria-controls="top-menu" :aria-expanded="active">
        菜单 | Menu
      </button>
      <nav :class="[{'button-on': active}]">
        <ul id="menu-items">
          <li><RouterLink to="/">首页</RouterLink></li>
          <li><a target="_blank" href="https://bzgzs.cn/">访问官网</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      active: false
    }
  },

  methods: {
    buttonClick: function () {
      this.active = !this.active;
    }
  }
}
</script>

<style scoped>
#main-menu {
  padding: 0.3rem 2rem;
  border-bottom: 2px solid #808080;
}

#main-menu h1, h4 {
  margin: 0;
  line-height: 1.35;
}

#main-menu h4 {
  margin-left: 0.5rem;
}

#main-menu a {
  border: none;
  color: #000000;
}

#main-menu a:hover {
  color: #ff7777;
}

#main-menu nav ul {
  margin: 0;
  padding: 0;
}

#main-menu nav li {
  display: inline-block;
  list-style: none;
}

#main-menu nav a {
  display: block;
  padding: 0.3rem 0.5rem;
}

@media screen and (min-width: 48.875em) {
  #main-menu button.top-menu-button {
    display: none;
  }

  #main-menu nav a {
    border-radius: 0.5rem;
  }

  #main-menu nav a:hover {
    background-color: rgba(255, 119, 119, 0.2);
  }
}

@media screen and (max-width: 48.875em) {
  #main-menu {
    position: static;
  }

  #main-menu h4, nav {
    display: none;
    margin: 1rem 0;
  }

  #main-menu nav a {
    width: 100%;
  }

  #main-menu nav li.menu-item-has-children > a {
    width: calc(100% - 4rem);
  }

  #main-menu nav li {
    border-top: 1px solid #A0A0A0;
  }

  #main-menu nav li:last-child {
    border-bottom: 1px solid #A0A0A0;
  }

  #main-menu nav.button-on {
    display: block;
    -webkit-flex: 0 1 100%;
    -ms-flex: 0 1 100%;
    flex: 0 1 100%;
  }

  #main-menu nav.button-on li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
}
</style>