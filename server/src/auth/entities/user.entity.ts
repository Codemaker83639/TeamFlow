import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Comment } from '../../comments/entities/comment.entity';
import { TaskAttachment } from '../../attachments/entities/task-attachment.entity';
import { UserRole } from './user.enums';

@Entity('users')
export class User {
    // ... (El resto del archivo no cambia)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password_hash: string;

    @Column()
    full_name: string;

    @Column({
        type: 'enum',
        enum: UserRole, // Esto ahora funciona correctamente
        default: UserRole.MEMBER,
    })
    role: UserRole;

    @Column({ nullable: true })
    avatar_url: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => TaskAttachment, (attachment) => attachment.uploaded_by)
    attachments: TaskAttachment[];

    @BeforeInsert()
    async hashPassword() {
        this.password_hash = await bcrypt.hash(this.password_hash, 10);
    }
}