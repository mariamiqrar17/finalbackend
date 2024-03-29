import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './schemas/user.schema';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Registration')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'User registration',
    description: 'Register a new user',
  })
  @ApiBody({ type: SignUpDto })
  @ApiResponse({
    status: 201,
    description: 'User registered',
    type: () => ({ token: String }),
  })
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate and generate a token for the user',
  })
  @ApiResponse({
    status: 200,
    description: 'User authenticated',
    type: () => ({ token: String }),
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  login(@Body() Logindto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(Logindto);
  }

  @Get()
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Get all users',
    description: 'Get all registered users',
  })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: User,
    isArray: true,
  })
  async getAllUsers(): Promise<User[]> {
    try {
      return this.authService.findAll();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Delete a user',
    description: 'Delete a user by ID',
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: User,
  })
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.authService.deleteById(id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Get a user by their ID',
  })
  @ApiResponse({
    status: 200,
    description: 'User found',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.authService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post('logout')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Logout user',
    description: 'Logout the currently logged-in user',
  })
  @ApiResponse({
    status: 200,
    description: 'Logged out successfully',
  })
  async logout(@Req() request) {
    const token = request.headers.authorization.split(' ')[1];
    await this.authService.logout(token);
    return { message: 'Logged out successfully' };
  }
}
