import { prisma } from "../config/prisma";
import { AppError } from "../utils/customErrors";
import { userResponseDto, UpdateUserDto} from './user.dto';
import bcrypt from 'bcryptjs';

const selectSafe = {id : true, name : true, email : true, updatedAt : true, createdAt : true} as const;

export async function getUser(id:string): Promise<userResponseDto |null> {
    return prisma.user.findUnique({where:{ id }, select: selectSafe});
}

async function handlePasswordUpdate(id: string, newPasswordPlainText: string): Promise<string> {
  const currentUser = await prisma.user.findUnique({
    where: { id },
    select: { password: true },
  });

  if (currentUser) {
    const isSamePassword = await bcrypt.compare(
      newPasswordPlainText,
      currentUser.password,
    );
    if (isSamePassword) {
      throw new AppError('BadRequestError', 'New password cannot be the same as the old one.', 400);
    }
  }

  const newHashedPassword = await bcrypt.hash(newPasswordPlainText, 10);

  return newHashedPassword;
}
export async function updateUser(id: string, data: UpdateUserDto): Promise<userResponseDto | null> {
    try{
        const dataToUpdate : Partial<UpdateUserDto & { password ?: string} > = {...data};
        if(data.password)
            dataToUpdate.password = await handlePasswordUpdate(id, data.password);
        const user = await prisma.user.update({
            where : { id },
            data: dataToUpdate,
            select : selectSafe,
        });

        return user;
    }catch(e : any){
        if(e?.code ==='P2025') return null;
        if(e?.code ==='P2002') throw new AppError('ConflictError', 'Email already exists',409);
        throw e;
    }
}
``
export async function deleteUser(id:string): Promise<boolean> {
    try{
        await prisma.user.delete({ where: { id } });
        return true;
    }catch(e: any){
        if(e?.code === 'P2025') return false;
        throw e;
    }
}
type Rank ={
        name : string;
        minScore : number;
    };
class rankService{

    private static readonly RANK_THREHOLDS: readonly Rank[] = [
        {name : 'BRONZE', minScore : 0},
        {name : 'SILVER', minScore : 100},
        {name : 'GOLD',   minScore : 500},
    ];

    public static  getRankFromScore = (
        score : number,
        thresholds : readonly Rank[] = rankService.RANK_THREHOLDS
    ): string =>{
        for(const rank of thresholds){
            if(score >= rank.minScore) return rank.name;
        }

        throw new Error('Invalid score');
    };
};

export async function upgradeRankUser(id: string): Promise<userResponseDto | null> {
    try{
        const user = await prisma.user.findUnique({ where: { id } });
        if(!user) return null;

        const newRank = rankService.getRankFromScore(user.score);        
        if(user.rank === newRank) {
            const { password, ...safeUser } = user;
            return safeUser;
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: { rank: newRank },
            select: selectSafe,
        });

        return updatedUser;
    }catch(e: any){
        if(e?.code === 'P2025') return null;
        throw e;
        
    }
}

export async function canFound(id: string): Promise<userResponseDto | null> {
    try{
        const user  = await prisma.user.findUnique({ where: { id } });
        if(!user) throw new AppError('NotFoundError', 'User not found', 404);
        return user;
    } catch(e: any) {
        throw e;
    }
}