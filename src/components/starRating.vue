<template>
  <div class="star-rating">
    <span class="iconfont star-item"
      v-for="(item, index) in itemClasses"
      :class="[item]"
      :style="{color: activeColor}"
      :key='index'
      @click='rate(index)'>
    </span>
  </div>
</template>
<script>
const CLS_ON = 'icon-on'
// const CLS_HALF = 'icon-half'
const CLS_OFF = 'icon-off'
export default {
  props: ['score', 'maxScore', 'size', 'color', 'readOnly'],
  data () {
    return {
      myScore: this.score || 0,
      activeColor: this.color || '#ffd552'
    }
  },
  computed: {
    itemClasses () {
      let result = []
      let score = Math.floor(this.myScore * 2) / 2
      // let hasHalf = score % 1 !== 0
      let integer = Math.floor(score)
      let maxScore = this.maxScore === undefined ? 5 : this.maxScore
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      // if (hasHalf) {
      //   result.push(CLS_HALF)
      // }
      while (result.length < Math.floor(maxScore)) {
        result.push(CLS_OFF)
      }
      return result
    }
  },
  methods: {
    rate (val) {
      if (!this.readOnly) {
        this.myScore = val + 1
        this.$emit('rate', val + 1)
        this.$emit('addScore')
      }
    }
  }
}
</script>
<style lang="scss">
@import '../style/px2rem.scss';
.star-rating {
  display: inline-block;
  .star-item {
    vertical-align: top;
    font-size: px2rem(64);
    margin-right: px2rem(20);
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
