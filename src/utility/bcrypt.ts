import bcrypt from 'bcryptjs';
import User from '../models/user';

class Userhash {
  static async hashPassword(user: User) {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }

  static async comparePassword(user: User, password: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, user.password);
    } catch (error) {
      throw new Error('Password comparison failed');
    }
  }
}


User.beforeCreate(async (user: User) => {
  await Userhash.hashPassword(user);
});

User.beforeUpdate(async (user: User) => {
  await Userhash.hashPassword(user);
});

export default Userhash;
 