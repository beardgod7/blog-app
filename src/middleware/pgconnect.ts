import sequelize from "../database/pgconfig";

export const syncDatabase=async(): Promise<void> => {
    try {
      await sequelize.sync();
      console.log('Database synchronized.');
    } catch (error) {
      console.error('Database synchronization failed:', error);
    }
  }
 