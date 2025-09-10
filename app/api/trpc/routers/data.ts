import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { getLiveRecipeData, getSystemDataFunc2 } from '@/app/api/data/functions/system_user_recipe';
import { preCalculateData } from '@/libs/preCalculatedRecipeData';
import { PreCalculatedRecipeData } from '@/types/recipeTypes';
import { systemDataSchema, preCalculatedRecipeDataSchema } from '@/types/zodSchemas';

export const dataRouter = router({
  getAllData: publicProcedure
    .input(z.object({
      orgId: z.string(),
      recipeId: z.string(),
    }))
    .output(z.object({
        recipeData: preCalculatedRecipeDataSchema,
        systemData: systemDataSchema,
    }))
    .query(async ({ input }) => {
      const { orgId, recipeId } = input;
      const recipeData = await getLiveRecipeData(recipeId, orgId);
      const dataObject = { data: recipeData[0] } as PreCalculatedRecipeData;
      const systemData = await getSystemDataFunc2(orgId);

      const preCalcData = await preCalculateData(dataObject, systemData);

      return {
        recipeData: { ...preCalcData, ...dataObject },
        systemData,
      };
    }),
});
