<template>
  <div class="container">
    <h1>Shipping Address</h1>

    <div class="shipping-address__actions shipping-address__actions--left">
      <base-button class="button button-secondary" type="button" @click="addAddress">
        + Add Address
      </base-button>
    </div>

    <div v-if="localAddresses.length" class="shipping-address__container">
      <div
        v-for="(address, index) in localAddresses"
        :key="index"
        class="shipping-address__address"
      >
        <label class="shipping-address__radio">
          <input
            type="radio"
            name="default-address"
            :checked="address.isDefault"
            @change="setDefault(index)"
          />
          <span class="shipping-address__details">
            <span v-if="address.isDefault">(Default) </span
            ><strong>Address {{ index + 1 }} : </strong>
            <template v-if="address.addressLine"> {{ address.addressLine }}</template>
          </span>
        </label>

        <address-fields v-if="!address.addressLine" ref="addressFieldRefs" v-model="address.form" />
      </div>
    </div>
    <p v-else>No shipping address</p>

    <div class="shipping-address__actions shipping-address__actions--right">
      <base-button class="button button-primary" type="button" @click="updateAddresses">
        Update
      </base-button>
    </div>
  </div>
</template>

<script>
import AddressFields from '@/components/users/AddressFields.vue'
import { createEmptyAddressForm, formatAddress, isAddressFormComplete } from '@/services/phAddress'

export default {
  name: 'UserShippingAddress',
  components: {
    AddressFields,
  },
  data() {
    return {
      localAddresses: [],
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/currentUser']
    },
  },
  watch: {
    user: {
      immediate: true,
      handler(user) {
        this.localAddresses = this.normalizeAddresses(user?.addresses)
      },
    },
  },
  methods: {
    normalizeAddresses(addresses) {
      if (Array.isArray(addresses)) {
        return addresses.map((addr) => ({
          addressLine: addr.addressLine,
          isDefault: Boolean(addr.isDefault),
          form: null,
        }))
      }
      if (!addresses) return []
      return [{ addressLine: addresses, isDefault: true, form: null }]
    },
    addAddress() {
      this.localAddresses.push({
        addressLine: '',
        isDefault: this.localAddresses.length === 0,
        form: createEmptyAddressForm(),
      })
    },
    setDefault(index) {
      this.localAddresses = this.localAddresses.map((addr, i) => ({
        ...addr,
        isDefault: i === index,
      }))
    },
    updateAddresses() {
      const fieldRefs = this.$refs.addressFieldRefs
      const refs = Array.isArray(fieldRefs) ? fieldRefs : fieldRefs ? [fieldRefs] : []
      const formsValid = refs.every((ref) => ref.validate())

      if (!formsValid) return

      const addresses = []

      for (const addr of this.localAddresses) {
        if (addr.form) {
          if (!isAddressFormComplete(addr.form)) continue
          addresses.push({
            addressLine: formatAddress(addr.form),
            isDefault: addr.isDefault,
          })
          continue
        }

        if (addr.addressLine?.trim()) {
          addresses.push({
            addressLine: addr.addressLine,
            isDefault: addr.isDefault,
          })
        }
      }

      if (addresses.length && !addresses.some((addr) => addr.isDefault)) {
        addresses[0].isDefault = true
      }

      this.$store.dispatch('user/updateAddresses', addresses)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f0f0f0;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.shipping-address {
  &__actions {
    display: flex;

    &--left {
      justify-content: flex-start;
    }

    &--right {
      justify-content: flex-end;
    }

    .button {
      width: auto;
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__address {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 0.75rem;
    background-color: #fff;
  }

  &__radio {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    cursor: pointer;

    input[type='radio'] {
      margin-top: 0.2rem;
      accent-color: #3b82f6;
      flex-shrink: 0;
    }
  }

  &__details {
    margin: 0;
    line-height: 1.4;
  }
}
</style>
