<template>
  <div class="ali-input" :class="{'ali-input_active': isFocus}" :style="{width: width}">
    <slot name="prepend"></slot>
    <input
      class="ali-input-field"
      ref="aliInput"
      v-model="inputValue"
      v-bind="$props"
      :type="_type"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :autofocus="autofocus"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="changeHander"
    />
    <span class="iconfont icon-delete" :class="_showPwdEye ? 'ali-input-clear' : 'ali-input-eye'"  v-if="_showClear" @click="handleClear"></span>
    <span class="iconfont ali-input-eye" :class="eyeClass"  v-if="_showPwdEye" @click="handlePwdEye"></span>
    <slot name="append"></slot>
  </div>
</template>

<script type="text/ecmascript-6">
const COMPONENT_NAME = 'ali-input'
const EVENT_INPUT = 'input'
const EVENT_CHANGE = 'change'
const EVENT_BLUR = 'blur'
const EVENT_FOCUS = 'focus'

export default {
  name: COMPONENT_NAME,
  props: {
    value: {},
    type: {
      type: String,
      default: 'text'
    },
    width: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default () {
        return false
      }
    },
    placeholder: String,
    readonly: {
      type: Boolean,
      default () {
        return false
      }
    },
    autofocus: {
      type: Boolean,
      default () {
        return false
      }
    },
    autocomplete: {
      type: [Boolean, String],
      default () {
        return false
      }
    },
    name: String,
    id: String,
    form: String,
    minlength: Number,
    maxlength: Number,
    resize: String,
    min: Number,
    max: Number,
    step: Number,
    tabindex: String,
    clearable: {
      type: [Boolean, Object],
      default () {
        return true
      }
    },
    eye: {
      type: [Boolean, Object],
      default () {
        return true
      }
    }
  },
  data () {
    return {
      inputValue: this.value,
      isFocus: false,
      formatedClearable: {
        visible: false,
        blurHidden: true
      },
      formatedEye: {
        open: false,
        reverse: true
      }
    }
  },
  computed: {
    _type () {
      const type = this.type
      if (type === 'password' && this.eye && this.pwdVisible) {
        return 'text'
      }
      return type
    },
    _showClear () {
      let visible =
        this.formatedClearable.visible &&
        this.inputValue &&
        !this.readonly &&
        !this.disabled
      if (this.formatedClearable.blurHidden && !this.isFocus) {
        visible = false
      }
      return visible
    },
    _showPwdEye () {
      return this.type === 'password' && this.eye && !this.disabled
    },
    pwdVisible () {
      const eye = this.formatedEye
      return eye.reverse ? !eye.open : eye.open
    },
    eyeClass () {
      return this.formatedEye.open ? 'icon-eye-off' : 'icon-eye-on'
    }
  },
  watch: {
    value (newValue) {
      this.inputValue = newValue
    },
    inputValue (newValue) {
      this.$emit(EVENT_INPUT, newValue)
    },
    clearable: {
      handler () {
        this.formatClearable()
      },
      deep: true,
      immediate: true
    },
    eye: {
      handler () {
        this.formateEye()
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    changeHander (e) {
      this.$emit(EVENT_CHANGE, e)
    },
    formatClearable () {
      if (typeof this.clearable === 'boolean') {
        this.formatedClearable.visible = this.clearable
      } else {
        Object.assign(this.formatedClearable, this.clearable)
      }
    },
    formateEye () {
      if (typeof this.eye === 'boolean') {
        this.formatedEye.open = this.eye
      } else {
        Object.assign(this.formatedEye, this.eye)
      }
    },
    handleFocus (e) {
      this.$emit(EVENT_FOCUS, e)
      this.isFocus = true
    },
    handleBlur (e) {
      this.$emit(EVENT_BLUR, e)
      this.isFocus = false
    },
    handleClear (e) {
      this.inputValue = ''
      this.$refs.aliInput.focus()
    },
    handlePwdEye () {
      this.formatedEye.open = !this.formatedEye.open
    }
  }
}
</script>
<style lang="scss">
@import '../style/px2rem.scss';
.ali-input {
  position: relative;
  margin: 0 auto px2rem(20);
  height: px2rem(88);
  line-height: 4.4rem;
  text-align: left;
  border-radius: px2rem(10);
  background: #fff;
  .prepend-span {
    display: inline-block;
    width: px2rem(140);
    font-size: px2rem(28);
    color: #333;
    margin-left: px2rem(20);
  }
  .append-span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: px2rem(140);
    height: 100%;
    .verify-img {
      position: absolute;
      top: px2rem(8);
      right: - px2rem(130);
      height: px2rem(72);
      width: px2rem(140);
      border-radius: px2rem(8);
    }
  }
  .ali-input-field {
    display: inline-block;
    padding: px2rem(20) 0;
    margin-left: px2rem(40);
    border: none;
    box-sizing: border-box;
    border-radius: px2rem(4);
    outline: none;
    background: inherit;
    font-size: px2rem(28);
    vertical-align: baseline;
  }
  .ali-input-clear, .ali-input-eye {
    position: absolute;
    font-size: px2rem(44);
    color: #666;
  }
  .ali-input-clear {
    right: px2rem(80);
  }
  .ali-input-eye {
    right: px2rem(20);
  }
}
.ali-input_active {
  &::after {
    border-color: #fff;
  }
}
</style>
