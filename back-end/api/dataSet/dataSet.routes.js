import express from 'express'


import { getDataSet } from './dateSet.controller.js'
const router = express.Router()

router.get('/', getDataSet)

export const dataSetRoutes = router