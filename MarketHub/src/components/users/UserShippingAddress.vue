<template>
  <section class="shipping-address">
    <div class="shipping-address__header">
      <p class="shipping-address__eyebrow">Delivery</p>
      <h1>Shipping Address</h1>
    </div>

    <div class="shipping-address__actions shipping-address__actions--left">
      <base-button
        class="button button-secondary shipping-address__add"
        type="button"
        @click="addAddress"
      >
        + Add Address
      </base-button>
    </div>

    <div v-if="localAddresses.length" class="shipping-address__list">
      <div
        v-for="(address, index) in localAddresses"
        :key="index"
        class="shipping-address__card"
        :class="{ 'shipping-address__card--default': address.isDefault }"
      >
        <div class="shipping-address__row">
          <label class="shipping-address__radio">
            <input
              type="radio"
              name="default-address"
              :checked="address.isDefault"
              @change="setDefault(index)"
            />
            <span class="shipping-address__details">
              <span class="shipping-address__label-row">
                <strong>Address {{ index + 1 }}</strong>
                <span v-if="address.isDefault" class="shipping-address__badge">Default</span>
              </span>
              <span v-if="address.addressLine" class="shipping-address__line">
                {{ address.addressLine }}
              </span>
            </span>
          </label>

          <button
            v-if="localAddresses.length > 1"
            type="button"
            class="shipping-address__delete"
            aria-label="Delete address"
            @click="openDeleteDialogue(index)"
          >
            <i class="fa-solid fa-trash" aria-hidden="true"></i>
          </button>
        </div>

        <address-fields v-if="!address.addressLine" ref="addressFieldRefs" v-model="address.form" />
      </div>
    </div>
    <div v-else class="shipping-address__empty">
      <i class="fa-solid fa-location-dot" aria-hidden="true"></i>
      <p>No shipping address yet. Add one to get started.</p>
    </div>

    <div class="shipping-address__footer">
      <base-button
        class="button button-primary"
        type="button"
        :disabled="!hasChanges"
        @click="updateAddresses"
      >
        Update
      </base-button>
    </div>

    <base-dialogue :isOpen="isDeleteDialogueOpen" @close="closeDeleteDialogue">
      <div class="delete-dialogue">
        <h3 class="text-heading delete-dialogue__title">Remove address</h3>
        <p class="text-body text-muted">
          Do you want to delete
          <span v-if="pendingDeleteLabel">{{ pendingDeleteLabel }}</span
          >?
        </p>
        <div class="delete-dialogue__actions">
          <base-button class="button button-dialogue button-secondary" @click="closeDeleteDialogue"
            >No</base-button
          >
          <base-button class="button button-dialogue button-danger" @click="confirmDeleteAddress"
            >Yes</base-button
          >
        </div>
      </div>
    </base-dialogue>
  </section>
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
      savedAddresses: [],
      isDeleteDialogueOpen: false,
      pendingDeleteIndex: null,
    }
  },
  computed: {
    user() {
      return this.$store.getters['user/currentUser']
    },
    hasChanges() {
      if (this.localAddresses.some((addr) => addr.form)) return true
      if (this.localAddresses.length !== this.savedAddresses.length) return true

      return this.localAddresses.some((addr, index) => {
        const saved = this.savedAddresses[index]
        return addr.addressLine !== saved.addressLine || addr.isDefault !== saved.isDefault
      })
    },
    pendingDeleteLabel() {
      if (this.pendingDeleteIndex == null) return ''
      const address = this.localAddresses[this.pendingDeleteIndex]
      if (!address) return ''
      return address.addressLine || `Address ${this.pendingDeleteIndex + 1}`
    },
  },
  watch: {
    user: {
      immediate: true,
      handler(user) {
        this.localAddresses = this.normalizeAddresses(user?.addresses)
        this.savedAddresses = this.localAddresses.map(({ addressLine, isDefault }) => ({
          addressLine,
          isDefault,
        }))
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
    openDeleteDialogue(index) {
      if (this.localAddresses.length <= 1) return
      this.pendingDeleteIndex = index
      this.isDeleteDialogueOpen = true
    },
    closeDeleteDialogue() {
      this.isDeleteDialogueOpen = false
      this.pendingDeleteIndex = null
    },
    confirmDeleteAddress() {
      const index = this.pendingDeleteIndex
      if (index == null || this.localAddresses.length <= 1) {
        this.closeDeleteDialogue()
        return
      }

      const wasDefault = this.localAddresses[index].isDefault
      this.localAddresses.splice(index, 1)

      if (wasDefault && this.localAddresses.length) {
        this.localAddresses[0].isDefault = true
      }

      this.closeDeleteDialogue()
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
.shipping-address {
  width: 100%;
  padding: 1.25rem 1.35rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1.15rem;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1rem;
  }

  &__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0.2rem;
  }

  &__eyebrow {
    margin: 0;
    color: #64748b;
    font-size: 0.8rem;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--primary);

    @media (max-width: 768px) {
      font-size: 1.25rem;
    }
  }

  &__actions {
    display: flex;

    &--left {
      justify-content: flex-start;
    }
  }

  &__add {
    width: auto;
    white-space: nowrap;
  }

  &__list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__card {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    padding: 0.95rem 1rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 0.85rem;
    box-sizing: border-box;
    transition:
      border-color 0.2s ease,
      background 0.2s ease;

    &--default {
      background: #eff6ff;
      border-color: #bfdbfe;
    }
  }

  &__row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 0.75rem;
  }

  &__radio {
    display: flex;
    align-items: flex-start;
    gap: 0.7rem;
    cursor: pointer;
    flex: 1;
    min-width: 0;

    input[type='radio'] {
      margin-top: 0.25rem;
      accent-color: #2563eb;
      flex-shrink: 0;
    }
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    min-width: 0;
  }

  &__label-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;

    strong {
      color: #0f172a;
    }
  }

  &__badge {
    display: inline-flex;
    align-items: center;
    padding: 0.15rem 0.55rem;
    border-radius: 999px;
    background: #2563eb;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 700;
  }

  &__line {
    color: #475569;
    line-height: 1.45;
    word-break: break-word;
    overflow-wrap: anywhere;
  }

  &__delete {
    border: none;
    background: transparent;
    color: #ef4444;
    cursor: pointer;
    padding: 0.35rem;
    border-radius: 0.5rem;
    flex-shrink: 0;

    &:hover {
      background: #fef2f2;
      color: #dc2626;
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem 1rem;
    background: #f8fafc;
    border: 1px dashed #cbd5e1;
    border-radius: 0.85rem;
    color: #64748b;
    text-align: center;

    i {
      font-size: 1.25rem;
      color: #94a3b8;
    }

    p {
      margin: 0;
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;

    .button {
      width: auto;
    }

    @media (max-width: 480px) {
      .button {
        width: 100%;
      }
    }
  }
}

.delete-dialogue {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;

  h3,
  p {
    margin: 0;
  }

  &__title {
    color: var(--error);
  }

  span {
    font-weight: 700;
    color: #0f172a;
    word-break: break-word;
  }

  &__actions {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    margin-top: 0.5rem;
    flex-wrap: wrap;
  }

  .button-dialogue {
    min-width: 75px;
  }
}
</style>
