import joi from "joi"

const education_schema=joi.object({
    education: {
        schoolName:joi.string().required(),
          description:joi.string().required(),
          program: joi.string().required(),
          image: joi.string().uri().required(),
          grade:  joi.string().optional(),
          startDate: joi.date().optional(),
          endDate: joi.date().optional(),
        },
      

})