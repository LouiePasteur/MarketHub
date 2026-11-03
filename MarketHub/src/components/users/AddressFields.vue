<template>
  <div class="address-fields">
    <div class="form-group">
      <label class="text-label" :for="ids.street">Address Line</label>
      <input
        type="text"
        :id="ids.street"
        required
        :class="{ error: fieldError('street') }"
        :value="modelValue.street"
        @input="updateField('street', $event.target.value)"
        @blur="touchField('street')"
        placeholder="House no., street, building"
      />
      <p v-if="fieldError('street')" class="form-error">{{ fieldError('street') }}</p>
    </div>

    <div class="form-group">
      <label class="text-label" :for="ids.region">Region</label>
      <select
        :id="ids.region"
        required
        :class="{ error: fieldError('region') }"
        :value="modelValue.regionCode"
        :disabled="loadingRegions"
        @change="onRegionChange"
        @blur="touchField('region')"
      >
        <option value="">Select region</option>
        <option v-for="region in regions" :key="region.code" :value="region.code">
          {{ region.name }}
        </option>
      </select>
      <p v-if="fieldError('region')" class="form-error">{{ fieldError('region') }}</p>
    </div>

    <div class="form-group" v-if="!isNcr">
      <label class="text-label" :for="ids.province">Province</label>
      <select
        :id="ids.province"
        required
        :class="{ error: fieldError('province') }"
        :value="modelValue.provinceCode"
        :disabled="!modelValue.regionCode || loadingProvinces"
        @change="onProvinceChange"
        @blur="touchField('province')"
      >
        <option value="">Select province</option>
        <option v-for="province in provinces" :key="province.code" :value="province.code">
          {{ province.name }}
        </option>
      </select>
      <p v-if="fieldError('province')" class="form-error">{{ fieldError('province') }}</p>
    </div>

    <div class="form-group">
      <label class="text-label" :for="ids.city">City</label>
      <select
        :id="ids.city"
        required
        :class="{ error: fieldError('city') }"
        :value="modelValue.cityCode"
        :disabled="citySelectDisabled || loadingCities"
        @change="onCityChange"
        @blur="touchField('city')"
      >
        <option value="">Select city</option>
        <option v-for="city in cities" :key="city.code" :value="city.code">
          {{ city.name }}
        </option>
      </select>
      <p v-if="fieldError('city')" class="form-error">{{ fieldError('city') }}</p>
    </div>

    <div class="form-group">
      <label class="text-label" :for="ids.barangay">Barangay</label>
      <select
        :id="ids.barangay"
        required
        :class="{ error: fieldError('barangay') }"
        :value="modelValue.barangay"
        :disabled="!modelValue.cityCode || loadingBarangays"
        @change="onBarangayChange"
        @blur="touchField('barangay')"
      >
        <option value="">Select barangay</option>
        <option v-for="barangay in barangays" :key="barangay.code" :value="barangay.name">
          {{ barangay.name }}
        </option>
      </select>
      <p v-if="fieldError('barangay')" class="form-error">{{ fieldError('barangay') }}</p>
    </div>

    <div class="form-group">
      <label class="text-label" :for="ids.zipCode">Zip Code</label>
      <input
        type="text"
        inputmode="numeric"
        :id="ids.zipCode"
        required
        maxlength="4"
        :class="{ error: fieldError('zipCode') }"
        :value="modelValue.zipCode"
        @input="onZipInput"
        @blur="touchField('zipCode')"
        placeholder="e.g. 1000"
      />
      <p v-if="fieldError('zipCode')" class="form-error">{{ fieldError('zipCode') }}</p>
    </div>
  </div>
</template>

<script>
import {
  getRegions,
  getProvincesByRegion,
  getCitiesByProvince,
  getCitiesByRegion,
  getBarangaysByCity,
  getAddressFieldErrors,
  isAddressFormComplete,
} from '@/services/phAddress'

let fieldId = 0

export default {
  name: 'AddressFields',
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  data() {
    fieldId += 1
    return {
      ids: {
        street: `address-street-${fieldId}`,
        region: `address-region-${fieldId}`,
        province: `address-province-${fieldId}`,
        city: `address-city-${fieldId}`,
        barangay: `address-barangay-${fieldId}`,
        zipCode: `address-zip-${fieldId}`,
      },
      regions: [],
      provinces: [],
      cities: [],
      barangays: [],
      loadingRegions: false,
      loadingProvinces: false,
      loadingCities: false,
      loadingBarangays: false,
      isNcr: false,
      showErrors: false,
      touched: {
        street: false,
        region: false,
        province: false,
        city: false,
        barangay: false,
        zipCode: false,
      },
    }
  },
  computed: {
    errors() {
      return getAddressFieldErrors(this.modelValue)
    },
    citySelectDisabled() {
      if (!this.modelValue.regionCode) return true
      if (this.isNcr) return false
      return !this.modelValue.provinceCode
    },
  },
  async created() {
    this.loadingRegions = true
    try {
      this.regions = await getRegions()
    } finally {
      this.loadingRegions = false
    }
  },
  methods: {
    fieldError(field) {
      if (!this.showErrors && !this.touched[field]) return ''
      return this.errors[field]
    },
    touchField(field) {
      this.touched[field] = true
    },
    validate() {
      this.showErrors = true
      Object.keys(this.touched).forEach((field) => {
        this.touched[field] = true
      })
      return isAddressFormComplete(this.modelValue)
    },
    emitUpdate(patch) {
      this.$emit('update:modelValue', {
        ...this.modelValue,
        ...patch,
      })
    },
    updateField(key, value) {
      this.emitUpdate({ [key]: value })
    },
    findName(list, code) {
      return list.find((item) => item.code === code)?.name || ''
    },
    async onRegionChange(event) {
      const regionCode = event.target.value
      const region = this.findName(this.regions, regionCode)

      this.touchField('region')
      this.provinces = []
      this.cities = []
      this.barangays = []
      this.isNcr = false

      this.emitUpdate({
        regionCode,
        region,
        provinceCode: '',
        province: '',
        cityCode: '',
        city: '',
        barangay: '',
        skipProvince: false,
      })

      if (!regionCode) return

      this.loadingProvinces = true
      try {
        this.provinces = await getProvincesByRegion(regionCode)
        this.isNcr = this.provinces.length === 0

        this.emitUpdate({
          regionCode,
          region,
          provinceCode: '',
          province: '',
          cityCode: '',
          city: '',
          barangay: '',
          skipProvince: this.isNcr,
        })

        if (this.isNcr) {
          this.loadingCities = true
          this.cities = await getCitiesByRegion(regionCode)
        }
      } finally {
        this.loadingProvinces = false
        this.loadingCities = false
      }
    },
    async onProvinceChange(event) {
      const provinceCode = event.target.value
      const province = this.findName(this.provinces, provinceCode)

      this.touchField('province')
      this.cities = []
      this.barangays = []

      this.emitUpdate({
        provinceCode,
        province,
        cityCode: '',
        city: '',
        barangay: '',
      })

      if (!provinceCode) return

      this.loadingCities = true
      try {
        this.cities = await getCitiesByProvince(provinceCode)
      } finally {
        this.loadingCities = false
      }
    },
    async onCityChange(event) {
      const cityCode = event.target.value
      const city = this.findName(this.cities, cityCode)

      this.touchField('city')
      this.barangays = []
      this.emitUpdate({
        cityCode,
        city,
        barangay: '',
      })

      if (!cityCode) return

      this.loadingBarangays = true
      try {
        this.barangays = await getBarangaysByCity(cityCode)
      } finally {
        this.loadingBarangays = false
      }
    },
    onBarangayChange(event) {
      this.touchField('barangay')
      this.updateField('barangay', event.target.value)
    },
    onZipInput(event) {
      const zipCode = event.target.value.replace(/\D/g, '').slice(0, 4)
      event.target.value = zipCode
      this.touchField('zipCode')
      this.updateField('zipCode', zipCode)
    },
  },
}
</script>

<style lang="scss" scoped>
.address-fields {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;

  label {
    flex-shrink: 0;

    &:has(+ input[required]),
    &:has(+ select[required]) {
      &::after {
        content: ' *';
        color: #ef4444;
        font-weight: bold;
      }
    }
  }

  input,
  select {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid var(--border, #e2e8f0);
    border-radius: var(--radius-md, 0.375rem);
    width: 100%;
    background-color: #fff;

    &:focus {
      outline: none;
      border-color: var(--primary, #3b82f6);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }

    &:disabled {
      background-color: #f8fafc;
      cursor: not-allowed;
    }

    &.error {
      border-color: var(--error, #ef4444);
    }
  }
}

.form-error {
  margin: 0;
  color: var(--error, #ef4444);
  font-size: 0.875rem;
}
</style>
