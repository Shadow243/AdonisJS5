import Factory from '@ioc:Adonis/Lucid/Factory'
import Country from 'App/Models/Country'

export const CountryFactory = Factory
  .define(Country, ({ faker }) => {      
      const selectedCountry = faker.address
      return {
      name: selectedCountry.county.toString(),
      code: selectedCountry.countryCode.name.toString(),
    }
  })
  .build()
